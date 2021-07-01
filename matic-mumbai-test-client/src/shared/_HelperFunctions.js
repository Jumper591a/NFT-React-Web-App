//*Importing Ethers from Installed Ethers Libary.
import { ethers } from "ethers";

//*Importing Constants and Pinata API functions current 'shared' folder.
import {
  testAuthentication,
  pinJSONToIPFS,
  retrievePinnedData,
} from "./_Pinata_API";
import { CONTRACT_ADDRESS, DAI_ABI } from "./_Constants";

//*Helper function for formatting the metadata to be stored in IPFS.
export const formatMetadata = (formData, file) => {
  //*Defining some properties I want the token to have.
  const swagLevel = "Ice";
  const legacy = "Rockstar, [GOAT]";
  const swagScore = "72";
  const fileSize = `${file.size} KB`;
  const fileType = file.file.type;

  let metadata = {
    title: formData.nftName,
    name: "TestCoin",
    description: formData.nftDescription,
    swagType: formData.swagType,
    swagScore: swagScore,
    Legacy: legacy,
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
        description: "https://gateway.pinata.cloud/ipfs/",
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

  //*Assigning additional properties depening if its a video or a image media source.
  if (file.file.type.includes("video")) {
    metadata.video = file;
    metadata.videoUrl = "https://gateway.pinata.cloud/ipfs/";
    metadata.properties.video = {
      type: "string",
      description: file.source,
    };
    metadata.properties.video_author = "";
  }

  //*Assigning additional properties depening if its a video or a image media source.
  else if (file.file.type.includes("image")) {
    metadata.image = file.source;
    metadata.imageUrl = "https://gateway.pinata.cloud/ipfs/";
    metadata.properties.image = {
      type: "string",
      description: file.source,
    };
    metadata.properties.image_author = "";
  }
  return metadata;
};

//*Helper Function for Pinning metadata to IPFS.
export const pinToPinata = async (formData, file) => {
  let status = 0;
  let result = {};

  //*Testing IPFS Connection First.
  await testAuthentication().then((res) => {
    console.log("status", res.status);
    status = res.status;
  });

  //*If test connection to IPFS is successful then proceed.
  if (file && status === 200) {
    //*Formatting metadata with helper function described above .
    const metadata = formatMetadata(formData, file);

    //*Finally calling the Pinata API to Pin the formatted metadata.
    await pinJSONToIPFS(metadata).then(function (res) {
      //handle res here
      console.log("JSON pinning res", res, "IPFShash", res.data["IpfsHash"]);
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
  connected,
  setNftLoading,
  setFormData,
  setIpfsData
) => {
  //*Setting up Ether functionality in order to interact with the network.
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const providerRPC = new ethers.providers.JsonRpcProvider();
  const signer = provider.getSigner();
  const _contract = new ethers.Contract(CONTRACT_ADDRESS, DAI_ABI, provider);

  //*Calling Helper function to start the pinning process and waiting for a successful response.
  const res = await pinToPinata(formData, file);

  //*If pinning was successful then we begin to mint the token with the IPFS Hash.
  if (res.status === true) {
    //*Formatting URI to contain the IPFS GateWay URL that we will use later.
    const URI = `https://gateway.pinata.cloud/ipfs/${res["IPFSHash"]}`;

    //*Connecting Signature to contract in order to interact with the Network.
    const _contract_with_sig = _contract.connect(signer);

    //*Minting Token and Assigning Token URI all in one Function.
    await _contract_with_sig.safeMint(connected.account, URI).then((res) => {
      // console.log("safe_mint", res);
    });

    //*Starting NFT loading & Resetting data states
    setNftLoading(true);

    setFormData({
      swagType: "",
      nftName: "",
      nftDescription: "",
    });
    setIpfsData({
      status: false,
      title: "",
      description: "",
      swagType: "",
      swagScore: "",
      legacy: "",
      swagLevel: "",
      video: "",
      image: "",
    });

    //!SetTimeOut - needed for getting the latest/correct token ID from the network
    setTimeout(async () => {
      //*Shutting Loading state as Falsy so that Token Propperties begin to display on the page.
      setNftLoading(false);

      //*Getting the latest Token ID aka the Minted Token we just Minted.
      const total_tokens = await _contract.balanceOf(connected.account);
      const last_token_index =
        total_tokens.toNumber() === 0 ? 0 : total_tokens.toNumber() - 1;
      const minted_token = await _contract_with_sig.tokenByIndex(
        last_token_index
      );
      const retrieved_uri = await _contract.tokenURI(minted_token.toNumber());

      //*Retrieving IPFS Data now that we have the IPFS Hash from the Token URI.
      await retrievePinnedData(retrieved_uri).then((res) => {
        // console.log("pinned data", res);
        //*Setting IPFS State Data with the above result.
        setIpfsData({
          status: true,
          title: res.data.properties.name.description,
          description: res.data.properties.description.description,
          swagType: res.data.properties.swagType.description,
          swagScore: res.data.properties.swagScore.description,
          legacy: res.data.properties.legacy.description,
          swagLevel: res.data.properties.swagLevel.description,
          video:
            "video" in res.data.properties
              ? res.data.properties.video.description
              : "",
          image:
            "image" in res.data.properties
              ? res.data.properties.image.description
              : "",
        });
      });
    }, 20000);
  } else console.log("error", res);
};
