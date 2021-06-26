import React, { useState, useEffect, useRef } from "react";

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
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useFileUpload } from "use-file-upload";
import "../index.css";

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
  animation-name: ${(props) => (props.animation === "fadeIn" ? fadeIn : "")};
  transform-origin: center;
  animation-duration: 3.2s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-delay: 0.8s;

  &:hover > svg {
    animation-name: ${jello};
    transform-origin: center;
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
  }
  &:focus {
    z-index: 0;
    animation-name: ${rotateOut};
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

S.Form = styled.form`
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
  @media screen and (max-width: 1390px) {
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
  display: flex;
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
  max-width: 790px;
  /* min-width: 490.198px; */

  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  min-width: 569.167px;
  @media screen and (max-width: 1040px) {
    margin-bottom: 100px;
  }
  & #first-child-Flex {
    margin-top: 15%;
  }
`;

S.NftName = styled.div`
  text-align: center;
  margin-top: 20px;
  font-weight: 700;
  font-size: 70px;
  color: #ffffffa0;
  letter-spacing: 0.5rem;
  text-shadow: 2px 2px #fc3290, 4px 4px #fc3290, 6px 6px #fc3290,
    8px 8px #fc3290, 2px 30px 15px #fc3290;
  /* border: 2px double #fc3290; */
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
const App = () => {
  const [connected, setConnected] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [swag, setSwag] = React.useState("");
  const [file, selectFile] = useFileUpload();

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const connectWallet = (e) => {
    e.preventDefault();
    setConnected(1);
  };

  const handleChange = (event) => {
    setSwag(event.target.value);
  };

  return (
    <S.AppContainer>
      <S.LoaderContainer>
        <S.LoaderImage />
      </S.LoaderContainer>
      <S.Header>
        <S.HeaderLogo src={swag_logo_1} animation={connected ? true : false} />
        <S.Tooltip
          disableFocusListener
          disableTouchListener
          title="Account: 0xd53CDbdD044bc9d58F6043ff7868A546A9FD2700 "
        >
          <S.Button
            animation={connected ? true : false}
            disableRipple
            display={connected ? "inline!important" : "none!important"}
          >
            Connected
          </S.Button>
        </S.Tooltip>
      </S.Header>
      <S.WalletConnectContain animation={connected ? true : false}>
        <S.WalletConnectText animation={connected ? "fadeOutUp2" : ""}>
          Connect
        </S.WalletConnectText>
        <S.WalletConnectAvatar
          animation={!connected ? "fadeIn" : ""}
          onClick={(event) => connectWallet(event)}
          tabIndex={1}
        >
          <S.VpnKeyTwoToneIcon />
        </S.WalletConnectAvatar>
        <S.WalletConnectText animation={connected ? "fadeOutUp2" : ""}>
          Wallet
        </S.WalletConnectText>
      </S.WalletConnectContain>
      <S.FlexContainer animation={connected ? "ZoomIn" : ""}>
        <S.Form>
          <S.FormTitle fontSize="15px" marginTop="20px">
            Matic-Mumbai Test Network
          </S.FormTitle>
          <S.FormTitle>Mint your NFT</S.FormTitle>
          <S.TextField id="outlined-basic" label="Name" variant="outlined" />
          <S.FormControl variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">
              Swag Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={swag}
              onChange={handleChange}
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
          />
          <S.StyledBtn
            variant="contained"
            startIcon={<SearchIcon />}
            animation="shakeY"
            margin=""
            borderColor="white"
            color="#440099"
            onClick={(event) => {
              event.preventDefault();
              // Single File Upload
              selectFile({}, ({ source, name, size, file }) => {
                // file - is the raw File Object
                console.log({ source, name, size, file });
                // Todo: Upload to cloud.
              });
            }}
          ></S.StyledBtn>

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
          >
            MINT
          </S.StyledBtn>
          <S.FileDetailsBox>
            <S.FileDetails>
              ⮵ &nbsp; <span>Mint when you are ready</span> &nbsp; ⮴{" "}
            </S.FileDetails>
          </S.FileDetailsBox>
        </S.Form>
        <S.FormResult>
          {file && (
            <div>
              <S.NftName>Jerry Stackhouznse</S.NftName>
              {/* {file.file.type.includes("image") && <p>image</p>} */}
              {/* {file.file.type.includes("video") && <p>video</p>} */}
              <S.Flex id="first-child-Flex">
                <S.ResultDetails color="#fc3290">Description: </S.ResultDetails>{" "}
                <S.ResultDetails> NFT of Jerry Balling </S.ResultDetails>
              </S.Flex>

              <S.Flex>
                <S.ResultDetails color="#fc3290">Swag Type: </S.ResultDetails>{" "}
                <S.ResultDetails> Art 🎨🖌️</S.ResultDetails>
              </S.Flex>

              <S.Flex>
                <S.ResultDetails color="#fc3290">Swag Score: </S.ResultDetails>{" "}
                <S.ResultDetails animation="true"> 72 </S.ResultDetails>
              </S.Flex>

              <S.Flex>
                <S.ResultDetails color="#fc3290">Legacy: </S.ResultDetails>{" "}
                <S.ResultDetails> 🤘 Rockstar, [GOAT] </S.ResultDetails>
              </S.Flex>

              <S.Flex>
                <S.ResultDetails color="#fc3290">Swag Level: </S.ResultDetails>{" "}
                <S.ResultDetails> Ice 🧊</S.ResultDetails>
              </S.Flex>
            </div>
          )}
        </S.FormResult>
        <div></div>
      </S.FlexContainer>
    </S.AppContainer>
  );
};

export default App;
