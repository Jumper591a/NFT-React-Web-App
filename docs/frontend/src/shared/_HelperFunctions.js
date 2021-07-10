//*Importing Ethers from Installed Ethers Libary.
import { ethers } from "ethers";

import { create } from "ipfs-http-client";

import {
  setIpfsData,
  setIpfsEmpty,
  setNftLoading,
  setLoadingOff,
} from "../store/index";

//*Importing Constants and Pinata API functions current 'shared' folder.
import {
  testAuthentication,
  pinJSONToIPFS,
  pinHashToIPFS,
  retrievePinnedData,
} from "./_Pinata_API";
import { DAI_ABI } from "./_Constants";

//*Helper function for formatting the metadata to be stored in IPFS.
export const formatMetadata = (formData, path, file) => {
  //*Defining some properties I want the token to have.
  const swagLevel = "Ice";
  const legacy = "Rockstar, [GOAT]";
  const swagScore = "72";
  const fileSize = `${file.size} KB`;
  const fileType = file.file.type;

  let metadata = {
    title: formData.nftName,
    image: `ipfs://${path}`,
    imageUrl: `https://gateway.pinata.cloud/ipfs/${path}`,
    image_author: "",
    image_type: fileType,
    name: "TestCoin",
    description: formData.nftDescription,
    swagType: formData.swagType,
    swagScore: swagScore,
    legacy: legacy,
    swagLevel: swagLevel,
    fileSize: fileSize,
    type: "object",
    properties: {
      name: {
        type: "string",
        description: formData.nftName,
      },
      description: {
        type: "string",
        description: formData.nftDescription,
      },
      image: {
        type: "string",
        description: `ipfs://${path}`,
      },

      swagType: {
        type: "string",
        description: formData.swagType,
      },
      legacy: {
        type: "string",
        description: legacy,
      },
      swagScore: {
        type: "string",
        description: swagScore,
      },
      swagLevel: {
        type: "string",
        description: swagLevel,
      },
      preview_media_file_type: {
        type: "string",
        description: fileType,
      },
      preview_media_file: {
        type: "string",
        description: `https://gateway.pinata.cloud/ipfs/${path}`,
      },
      created_at: {
        type: "datetime",
        description: "2021-13-21T17:52:51.269256+00:00",
      },
      total_supply: { type: "int", description: 1 },
      digital_media_signature_type: {
        type: "string",
        description: "SHA-256",
      },
      digital_media_signature: {
        type: "string",
        description: "0xCfdb2A5D3e85C3Bf6060f232dCbA8C7Fd757d3E5",
      },
    },
  };

  return metadata;
};

//*Helper Function for Pinning metadata to IPFS.
export const pinToPinata = async (formData, file, buffer) => {
  let status = 0;
  let result = { status: false };

  //*Testing IPFS Connection First.
  await testAuthentication().then((res) => {
    console.log("Your Connection Status to IPFS is: ", res.status);
    status = res.status;
  });

  //*If test connection to IPFS is successful then proceed.
  if (file && status === 200) {
    const ipfs = create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
    });

    const { path } = await ipfs.add(buffer);
    const pin_status = await pinHashToIPFS(path);

    //*Formatting metadata with helper function described above .
    const metadata = formatMetadata(formData, path, file);
    //*Finally calling the Pinata API to Pin the formatted metadata.
    await pinJSONToIPFS(metadata).then(function (res) {
      // console.log("JSON pinning res", res, "IPFShash", res.data["IpfsHash"]);
      result = {
        status: true,
        res: res,
        IPFSHash: res.data["IpfsHash"],
      };
    });
    return result;
  } else return { status: false };
};

//*Helper Function for Minting token to Mumbai Test network.
export const mintToNetwork = async (
  formData,
  file,
  account,
  dispatch,
  buffer,
  network_type,
  setToast,
  network
) => {
  //*Setting up Ether functionality in order to interact with the network.
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const _contract = new ethers.Contract(network, DAI_ABI, provider);

  //*Calling Helper function to start the pinning process and waiting for a successful response.
  const res = await pinToPinata(formData, file, buffer);

  //*If pinning was successful then we begin to mint the token with the IPFS Hash.
  if (res.status === true) {
    //*Formatting URI to contain the IPFS GateWay URL that we will use later.
    const URI = `https://gateway.pinata.cloud/ipfs/${res["IPFSHash"]}`;

    //*Connecting Signature to contract in order to interact with the Network.
    const _contract_with_sig = _contract.connect(signer);

    //*Minting Token and Assigning Token URI all in one Function.
    const mint_contract = await _contract_with_sig.safeMint(account, URI);

    //! Was testing a wait to get the correct token ID from network after minting.
    // mint_contract.wait();
    // console.log("mint_contract", mint_contract);
    // const total_tokens = await _contract.balanceOf(account);
    // const last_token_index =
    //   total_tokens.toNumber() === 0 ? 0 : total_tokens.toNumber() - 1;
    // const minted_token = await _contract_with_sig.tokenByIndex(
    //   last_token_index
    // );
    // const retrieved_uri = await _contract.tokenURI(minted_token.toNumber());
    // console.log(
    //   "minted_token_test",
    //   minted_token.toNumber(),
    //   "\nretrieved_uri_Test",
    //   retrieved_uri
    // );

    //*Starting NFT loading & Resetting data states
    dispatch(setNftLoading());
    dispatch(setIpfsEmpty());

    //!SetTimeOut - needed for getting the latest/correct token ID from the network
    setTimeout(async () => {
      //*Shutting Loading state as Falsy so that Token Propperties begin to display on the page.
      dispatch(setLoadingOff());

      //*Getting the latest Token ID aka the Minted Token we just Minted.
      const total_tokens = await _contract.balanceOf(account);
      const last_token_index =
        total_tokens.toNumber() === 0 ? 0 : total_tokens.toNumber() - 1;
      const minted_token = await _contract_with_sig.tokenByIndex(
        last_token_index
      );
      const retrieved_uri = await _contract.tokenURI(minted_token.toNumber());

      const nft_url = network_type.includes("matic")
        ? `https://testnets.opensea.io/assets/mumbai/${network}/${minted_token.toNumber()}`
        : `https://testnets.opensea.io/assets/${network}/${minted_token.toNumber()}`;

      //*Retrieving IPFS Data now that we have the IPFS Hash from the Token URI.
      await retrievePinnedData(retrieved_uri).then((res) => {
        //*Setting IPFS State Data with the above result.
        dispatch(setIpfsData(res.data));
        dispatch(
          setToast({
            status: true,
            type: "link",
            message: "😃 View your NFT on OpenSea 😃",
            message2: nft_url,
          })
        );
        console.log(
          "Your Token ID is: ",
          minted_token.toNumber(),
          "\nThe retrieved Token URI (metadata) is: ",
          retrieved_uri,
          "\nThe retrieved Token URL (view NFT on IPFS) is: ",
          res.data.imageUrl,
          "\nAdd the Token to your Meta Wallet => Contract Address: ",
          network,
          "\nView your NFT on Opensea Testnet: ",
          nft_url
        );
        console.log("|Data Retrieved from IPFS|\n", res.data);
      });
    }, 20000);
  } else console.log("error", res);
};
