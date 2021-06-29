import React, { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";

import styled, { css } from "styled-components/macro";
import swag_logo_2 from "../images/swag_logo_2.jpg";
import swag_logo_1 from "../images/swag_logo_1.png";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";

import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import SearchIcon from "@material-ui/icons/Search";
import VpnKeyTwoToneIcon from "@material-ui/icons/VpnKeyTwoTone";
import VpnKeyRoundedIcon from "@material-ui/icons/VpnKeyRounded";
import { MinimizeTwoTone } from "@material-ui/icons";

import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useFileUpload } from "use-file-upload";
import "../index.css";

import VideoLooper from "react-video-looper";

import {
  testAuthentication,
  pinFileToIPFS,
  pinJSONToIPFS,
  retrievePinnedData,
} from "../shared/_Pinata_API";

import { DAI_ABI, CONTRACT_ADDRESS, BYTE_CODE } from "../shared/_Constants";

import {
  jello,
  three,
  flash,
  rotateInFadeOutUp,
  rotateIn,
  rotateOut,
  fadeOutUp,
  display,
  fadeIn,
  fadeOutUp2,
  slideLeft,
  rubberBand,
  shakeY,
  hidden,
  ZoomIn,
  colorRotate,
  pushRight,
  spin,
} from "../shared/_Keyframes";

const S = {};
S.AppContainer = styled.div`
  /* border: 2px red solid; */
  display: flex;
  flex-direction: column;
  position: relative;

  height: 100vh;
  background-color: #ffffff;
  overflow-y: hidden;

  &:hover {
    background: white;
    box-shadow: 0px 2px 33px 0px rgba(0, 0, 0, 0.02);
  }
`;
S.LoaderContainer = styled.div`
  display: inherit;
  flex-direction: inherit;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #ececec;
  /* margin: 5% 0; */
  animation-name: ${fadeOutUp};
  animation-delay: 0.9s;
  transform-origin: center;
  animation-duration: 1.5s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
  /* box-shadow: 0px 4px 13px 0px rgba(255, 255, 255, 0.); */
  /* z-index: -15; */
  /* border: 2px green solid; */
`;
S.LoaderImage = styled.div`
  position: inherit;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${swag_logo_2});
  width: 70vw;
  height: 70vh;
  margin: 15% 10% 10% 15%;
  animation-name: ${rotateIn};
  transform-origin: center;
  animation-duration: 0.9s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;

  /* border: 2px blue solid; */
`;
S.Header = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: #333333;
  box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.4);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  @media screen and (max-width: 699.667px) {
    flex-direction: column-reverse;
  }
`;
S.HeaderLogo = styled.img`
  padding: 20px;
  width: 400px;
  object-fit: contain;
  transform-origin: center;
  animation-duration: 0.9s;
  animation-timing-function: ease-in-out;
  /* background-color: #333333; */
`;

S.Button = styled(Button)`
  background-color: white !important;
  border: 2px solid #440099 !important;
  color: #440099 !important;
  font-weight: bold !important;
  margin: 0 !important;
  right: -10vw;
  position: absolute;
  visibility: hidden;
  animation-name: ${(props) => (props.animation ? display : "")};
  transform-origin: center;
  animation-duration: 1.2s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  @media screen and (max-width: 699.667px) {
    margin-top: 10px !important;
  }
`;
S.Tooltip = styled(Tooltip)``;

S.ExmapleText = styled.p`
  border: 2px purple solid;
`;

S.WalletConnectContain = styled.span`
  display: flex;

  justify-content: center;
  margin-top: 30vh;
  animation-name: ${(props) => (props.animation ? hidden : "")};
  transform-origin: center;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-delay: 0.2s;
`;
S.WalletConnectAvatar = styled(Avatar)`
  vertical-align: center;
  background-color: #fc3290 !important;
  margin: 0 10px 0 20px;
  align-self: center;
  /* position: none !important; */
  /* display: none !important; */
  z-index: -1;
  width: 100px !important;
  height: 100px !important;
  border: 2px #f26d79 groove;
  cursor: pointer;
  animation-name: ${(props) =>
    props.animation === "fadeIn"
      ? fadeIn
      : props.animation === "rotateOut"
      ? rotateOut
      : ""};
  transform-origin: center;
  animation-duration: ${(props) =>
    props.animation === "rotateOut" ? "1s" : "3.2s"};
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-delay: ${(props) =>
    props.animation === "rotateOut" ? "0s" : "0.8s"};

  &:hover > svg {
    animation-name: ${jello};
    transform-origin: center;
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
  }
  &:focus {
    z-index: 0;
    animation-name: ${(props) =>
      props.animation === "fadeIn" ? "" : rotateOut};
    transform-origin: center;
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
    animation-delay: 0s;
  }

  box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.1);
`;

S.VpnKeyTwoToneIcon = styled(VpnKeyRoundedIcon)`
  /* position: relative !important; */
  width: 50px !important;
  height: 50px !important;
  color: #fff;
`;

S.WalletConnectText = styled.p`
  align-self: center;
  font-size: 64px;
  font-family: "Sacramento", cursive;
  color: #fc3290;
  animation-name: ${(props) =>
    props.animation === "fadeOutUp2" ? fadeOutUp2 : ""};
  transform-origin: center;
  animation-duration: 1.2s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-delay: 0.2s;
`;

S.FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  /* border: 2px red solid; */
  width: 95%;
  height: auto;
  margin: auto;
  z-index: -1;
  animation-name: ${(props) => (props.animation === "ZoomIn" ? ZoomIn : "")};
  transform-origin: center;
  animation-duration: 1.2s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-delay: 0.6s;
  @media screen and (max-width: 1040px) {
    justify-content: center;
  }
`;

S.FormInput = styled.form`
  background-color: #fc3290;
  border: 2px #333333 inset;
  min-height: 654.417px;
  min-width: 490.198px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
  @media screen and (max-width: 1144px) {
    margin-top: 20px;
    margin-bottom: 20px;
    margin-right: 0px;
  }
`;

S.TextField = styled(TextField)`
  margin-top: 15px !important;
  width: 80%;
  background: #fff !important;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  & label {
    border-color: #333333;
    color: #333333;
  }
  & fieldset {
    border-bottom-left-radius: 10px !important;
    border-bottom-right-radius: 10px !important;
    border-top-left-radius: 10px !important;
    border-top-right-radius: 10px !important;
  }

  & label.Mui-focused {
    color: black;
    font-weight: bolder;
    -webkit-text-stroke: 0.3px white;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #333333;
    }
  }
`;

S.FormControl = styled(FormControl)`
  border: 2px #c4c4c4 solid;
  border-bottom-left-radius: 10px !important;
  border-bottom-right-radius: 10px !important;
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;
  background-color: white;
  & label {
    color: #333333;
  }
  margin-top: 15px !important;
  .Mui-focused {
    border-bottom-left-radius: 10px !important;
    border-bottom-right-radius: 10px !important;
    border-top-left-radius: 10px !important;
    border-top-right-radius: 10px !important;
  }
  & label.Mui-focused {
    color: black;
    font-weight: bolder;
    -webkit-text-stroke: 0.3px white;
    border-color: #333333 !important;
  }
  & .Mui-focused fieldset {
    border-color: #333333 !important;
  }
  & > div {
    border-bottom-left-radius: 10px !important;
    border-bottom-right-radius: 10px !important;
    border-top-left-radius: 10px !important;
    border-top-right-radius: 10px !important;
  }
  width: 80%;
`;

S.FormTitle = styled.h2`
  color: white;
  text-align: center;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "35px")};
  font-family: "Montserrat", sans-serif;
`;

S.StyledBtn = styled(Button)`
  .MuiTouchRipple-root {
    /* border: 2px #440099 groove; */
  }
  &.MuiButton-root {
    margin-top: ${(props) => (props.margin ? props.margin : "10px")};
    background-color: #ffffff;
    border: 2px groove
      ${(props) => (props.boarderColor ? props.boarderColor : "white")};

    &:hover {
      background-color: #ffffff;

      animation-name: ${(props) =>
        props.animation === "shakeY" ? shakeY : rubberBand};
      transform-origin: center;
      animation-duration: 1s;
      animation-timing-function: ease-in-out;
    }
    /* align-self: flex-start; */
  }
  & > span.MuiButton-label {
    font-weight: ${(props) => (props.bold ? props.bold : "100")};
    color: #440099;
  }

  & > span {
    color: ${(props) => (props.color ? props.color : "black")};
  }
  & > span:nth-child(2) {
    border: 2px inset
      ${(props) => (props.borderColor ? props.borderColor : "transparent")};
  }

  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > span > span {
    margin-left: 8px;
  }
  & > span > span > svg > path {
    fill: ${(props) => (props.color ? props.color : "black")};
  }
`;
S.Flex = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: ${(props) => (props.flexDirection ? "column" : "row")};
  justify-content: ${(props) => (props.flexDirection ? "center" : "normal")};
  align-items: ${(props) => (props.flexDirection ? "center" : "normal")};

  & .first-child-FileDetails {
    color: #333333;
    margin-right: 10px;
  }
`;
S.FileDetailsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => (props.margin ? props.margin : "15px")};
  &#main-FileDetailsBox {
    justify-content: flex-start;
    align-items: flex-start;
    /* border: 2px green solid; */
  }
`;
S.FileDetails = styled.h3`
  color: white;
  text-align: center;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1.17em")};
  & > span {
    font-size: 0.8em;
  }
`;

S.FormResult = styled.span`
  background-color: #333333;
  border: 2px #fc3290 outset;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 654.417px;
  max-width: 569.167px;
  /* min-width: 490.198px; */

  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  min-width: 569.167px;
  @media screen and (max-width: 1123px) {
    margin-bottom: 100px;
  }
  & #first-child-Flex {
    margin-top: 15%;
  }
`;

S.NftName = styled.div`
  --c1: #1dd3b01a;
  --c2: #fc3290;
  text-align: center;
  margin-top: 20px;
  font-weight: 700;
  font-size: 70px;
  color: #ffffffa0;
  letter-spacing: 0.5rem;
  text-shadow: 2px 2px var(--c2), 4px 4px var(--c2), 6px 6px var(--c2),
    8px 8px var(--c2), 2px 30px 25px var(--c2);
  /* border: 2px double var(--c1); */
  /* border-radius: 1rem; */
  padding: 0 10px 10px 10px;
  transform: skew(-15deg);
  animation: ${three} 5s infinite ease-in-out alternate;
`;

S.ResultDetails = styled.h3`
  color: ${(props) => (props.color ? props.color : "white")};
  margin: 5px 5px 5px 15px;
  animation: ${(props) => (props.animation ? "1.8s linear 0s infinite " : "")};
  animation-name: ${colorRotate};
  animation-timing-function: ease-in-out;
`;
S.VideoLooper = styled(VideoLooper)`
  width: calc(100% - 10px);
  max-width: auto;
  max-height: 300px;
  object-fit: cover;
  background-color: transparent;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  /* position: relative; */
  /* border: white double 2px; */

  margin: 15px 5px;
  & > div {
    display: none;
  }
  & > video {
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    border: none;
    /* border: white double 2px; */
  }
  &:nth-child(3) {
    /* display: none; */
  }
`;
S.NftImage = styled.img`
  max-width: auto;
  max-height: 300px;
  object-fit: cover;
  margin: 15px 5px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
`;

const App = () => {
  const [connected, setConnected] = useState({ status: false, account: "" });

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    swagType: "",
    nftName: "",
    nftDescription: "",
  });

  const [ipfhData, setIpfhData] = useState({
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

  const [file, selectFile] = useFileUpload();

  const metaMask = window.ethereum;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const providerRPC = new ethers.providers.JsonRpcProvider();
  const signer = provider.getSigner();
  const _contract = new ethers.Contract(CONTRACT_ADDRESS, DAI_ABI, provider);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const connectWallet = async (e) => {
    e.preventDefault();
    if (typeof metaMask === "undefined") {
      alert("Install MetaMask Extension First !");
      window.location.reload();
    } else {
      const accounts = await metaMask.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      const blockNumber = await provider.getBlockNumber();
      const balance = await provider.getBalance(account);
      const bigNumberFormatter = ethers.utils.formatEther(balance);
      const userInputFormatted = ethers.utils.parseEther("1.0");

      console.log(
        "account: ",
        account,
        "\nblockNumber",
        blockNumber,
        "\nbalance",
        balance,
        "\nbigNumberFormatter",
        bigNumberFormatter,
        "\nuserInputFormatted",
        userInputFormatted,
        "\n_contract: ",
        _contract
      );
      setConnected({ status: true, account: account });
    }

    console.log(
      "provider: ",
      provider,
      "\nsigner: ",
      signer,
      "\n providerRPC",
      providerRPC
    );

    // await provider.getBlockNumber();
    // let balance = ethers.utils.formatEther(balance);
    // console.log("balance", balance);
  };

  const pinToPinata = async () => {
    let status = 0;
    let result = {};
    await testAuthentication().then((res) => {
      console.log("status", res.status);
      status = res.status;
    });

    console.log("status after", status);

    if (file && status === 200) {
      // pinFileToIPFS("", file);
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

      if (file.file.type.includes("video")) {
        metadata.video = file;
        metadata.videoUrl = "https://gateway.pinata.cloud/ipfs/";
        metadata.properties.video = {
          type: "string",
          description: file.source,
        };
        metadata.properties.video_author = "";
      } else if (file.file.type.includes("image")) {
        metadata.image = file.source;
        metadata.imageUrl = "https://gateway.pinata.cloud/ipfs/";
        metadata.properties.image = {
          type: "string",
          description: file.source,
        };
        metadata.properties.image_author = "";
      }
      await pinJSONToIPFS(metadata).then(function (res) {
        //handle res here
        console.log("JSON pinning res", res, "IPFShash", res.data["IpfsHash"]);
        result = {
          status: true,
          res: res,
          IPFSHash: res.data["IpfsHash"],
        };
      });
      // setIpfsHash(result.IPFSHash);
      return result;
    } else return { status: false };
  };

  const Mint = async (e) => {
    e.preventDefault();
    console.log(
      "Mint event",
      formData.nftName,
      formData.swagType,
      formData.nftDescription
    );
    const res = await pinToPinata();
    if (res.status === true) {
      console.log("success", res["IPFSHash"]);
      const URI = `ipfs://${res["IPFSHash"]}`;
      const _contract_with_sig = _contract.connect(signer);
      await _contract_with_sig.safeMint(connected.account).then((res) => {
        console.log("safe_mint", res);
      });

      const total_tokens = await _contract.balanceOf(connected.account);
      const last_token_index = total_tokens.toNumber() - 1;
      const minted_token = await _contract_with_sig.tokenByIndex(
        last_token_index
      );
      console.log(
        "balance",
        total_tokens.toNumber(),
        "last_token_index",
        last_token_index,
        "minted_token",
        minted_token.toNumber()
      );

      await _contract_with_sig
        .setTokenURI(minted_token.toNumber(), URI)
        .then((res) => {
          console.log("set uri res: ", res);
        });

      console.log("uri", URI);
      let retrieved_uri;
      retrieved_uri = await _contract.tokenURI(minted_token.toNumber());
      console.log("retrieved_uri", retrieved_uri);
      await retrievePinnedData(res["IPFSHash"]).then((res) => {
        console.log("pinned data", res);
        setIpfhData({
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
        setFormData({
          swagType: "",
          nftName: "",
          nftDescription: "",
        });
      });
    } else console.log("error", res);
  };

  const BrowseMedia = (e) => {
    e.preventDefault();
    // Single File Upload
    selectFile({}, ({ source, name, size, file }) => {
      // file - is the raw File Object
      console.log({ source, name, size, file });
    });
  };

  return (
    <S.AppContainer>
      <S.LoaderContainer>
        <S.LoaderImage />
      </S.LoaderContainer>
      <S.Header>
        <S.HeaderLogo
          src={swag_logo_1}
          animation={connected.status ? true : false}
        />
        <S.Tooltip
          disableFocusListener
          disableTouchListener
          title={`Account: ${connected.account}`}
        >
          <S.Button
            animation={connected.status ? true : false}
            disableRipple
            display={connected.status ? "inline!important" : "none!important"}
          >
            Connected
          </S.Button>
        </S.Tooltip>
      </S.Header>

      <S.WalletConnectContain animation={connected.status ? true : false}>
        <S.WalletConnectText animation={connected.status ? "fadeOutUp2" : ""}>
          Connect
        </S.WalletConnectText>
        <S.WalletConnectAvatar
          animation={!connected.status ? "fadeIn" : "rotateOut"}
          onClick={(event) => connectWallet(event)}
          tabIndex={1}
        >
          <S.VpnKeyTwoToneIcon />
        </S.WalletConnectAvatar>
        <S.WalletConnectText animation={connected.status ? "fadeOutUp2" : ""}>
          Wallet
        </S.WalletConnectText>
      </S.WalletConnectContain>

      <S.FlexContainer animation={connected.status ? "ZoomIn" : ""}>
        <S.FormInput>
          <S.FormTitle fontSize="15px" marginTop="20px">
            Matic-Mumbai Test Network
          </S.FormTitle>

          <S.FormTitle>Mint your NFT</S.FormTitle>

          <S.TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            onChange={(event) =>
              setFormData({
                swagType: formData.swagType,
                nftName: event.target.value,
                nftDescription: formData.nftDescription,
              })
            }

            // error
            // helperText="Give the NFT a Name Property"
          />

          <S.FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
              Swag Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={formData.swagType}
              onChange={(event) =>
                setFormData({
                  swagType: event.target.value,
                  nftName: formData.nftName,
                  nftDescription: formData.nftDescription,
                })
              }
              label="Swag Type"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Apparel"}>Apparel</MenuItem>
              <MenuItem value={"Art"}>Art</MenuItem>
              <MenuItem value={"Music"}>Music</MenuItem>
              <MenuItem value={"Accessories"}>Accessories</MenuItem>
            </Select>
          </S.FormControl>

          <S.TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            defaultValue=""
            variant="outlined"
            onChange={(event) =>
              setFormData({
                swagType: formData.swagType,
                nftName: formData.nftName,
                nftDescription: event.target.value,
              })
            }
            // error
            // helperText="Give the NFT a Description Property"
          />

          <S.StyledBtn
            variant="contained"
            startIcon={<SearchIcon />}
            animation="shakeY"
            margin=""
            borderColor="white"
            color="#440099"
            onClick={(event) => BrowseMedia(event)}
          />

          {file ? (
            <S.FileDetailsBox id="main-FileDetailsBox">
              <S.Flex>
                <S.FileDetails className="first-child-FileDetails">
                  {" "}
                  File:{" "}
                </S.FileDetails>
                <S.FileDetails>{file.name}</S.FileDetails>
              </S.Flex>
              <S.Flex>
                <S.FileDetails className="first-child-FileDetails">
                  {" "}
                  Size:{" "}
                </S.FileDetails>
                <S.FileDetails>{file.size} KB </S.FileDetails>
              </S.Flex>
            </S.FileDetailsBox>
          ) : (
            <S.FileDetailsBox>
              <S.FileDetails> 🔍🤔 Attach a media source ? . . .</S.FileDetails>
            </S.FileDetailsBox>
          )}

          <S.FileDetailsBox margin="60px">
            <S.FileDetails>
              ⮷ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;
              &nbsp; &nbsp;⮶{" "}
            </S.FileDetails>
          </S.FileDetailsBox>

          <S.StyledBtn
            variant="outlined"
            color="primary"
            href="#outlined-S.StyledBtns"
            animation="rubberBand"
            bold="bolder"
            boarderColor="#440099"
            onClick={(event) => Mint(event)}
          >
            MINT
          </S.StyledBtn>

          <S.FileDetailsBox>
            <S.FileDetails>
              ⮵ &nbsp; <span>Mint when you are ready</span> &nbsp; ⮴{" "}
            </S.FileDetails>
          </S.FileDetailsBox>
        </S.FormInput>
        <S.FormResult>
          {ipfhData.status && (
            <S.Flex flexDirection="true">
              <S.NftName>{ipfhData.title}</S.NftName>

              <S.Flex id="first-child-Flex">
                <S.ResultDetails color="#fc3290">Description: </S.ResultDetails>{" "}
                <S.ResultDetails> {ipfhData.description} </S.ResultDetails>
              </S.Flex>

              <S.Flex>
                <S.ResultDetails color="#fc3290">Swag Type: </S.ResultDetails>{" "}
                <S.ResultDetails>
                  {" "}
                  {ipfhData.swagType.includes("Art")
                    ? `${ipfhData.swagType} 🎨🖌️`
                    : ipfhData.swagType.includes("Music")
                    ? `${ipfhData.swagType} 🎵`
                    : ipfhData.swagType.includes("Apparel")
                    ? `${ipfhData.swagType} 👕`
                    : ipfhData.swagType.includes("Accessories")
                    ? `${ipfhData.swagType} 👓`
                    : ipfhData.swagType}
                </S.ResultDetails>
              </S.Flex>

              <S.Flex>
                <S.ResultDetails color="#fc3290">Swag Score: </S.ResultDetails>{" "}
                <S.ResultDetails animation="true">
                  {" "}
                  {ipfhData.swagScore}{" "}
                </S.ResultDetails>
              </S.Flex>

              <S.Flex>
                <S.ResultDetails color="#fc3290">Legacy: </S.ResultDetails>{" "}
                <S.ResultDetails>
                  {" "}
                  {ipfhData.legacy.includes("Rockstar")
                    ? `🤘 ${ipfhData.legacy}`
                    : ipfhData.legacy}{" "}
                </S.ResultDetails>
              </S.Flex>

              <S.Flex>
                <S.ResultDetails color="#fc3290">Swag Level: </S.ResultDetails>{" "}
                <S.ResultDetails>
                  {" "}
                  {ipfhData.swagLevel.includes("Ice")
                    ? `${ipfhData.swagLevel} 🧊`
                    : ipfhData.swagLevel}{" "}
                </S.ResultDetails>
              </S.Flex>
              <S.Flex flexDirection="true">
                {ipfhData.video && (
                  <S.VideoLooper
                    source={ipfhData.video}
                    start={0.0}
                    end={7.0}
                    muted={true}
                    autoplay={true}
                    loopCount={15}
                    isDebugMode={false}
                  />
                )}

                {ipfhData.image && (
                  <S.NftImage src={ipfhData.image}></S.NftImage>
                )}
              </S.Flex>
            </S.Flex>
          )}
        </S.FormResult>
      </S.FlexContainer>
    </S.AppContainer>
  );
};

export default App;
