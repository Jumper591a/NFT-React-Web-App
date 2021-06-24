import React, { useState, useEffect, useRef } from "react";

import styled, { css } from "styled-components/macro";
import swag_logo_2 from "../images/swag_logo_2.jpg";
import swag_logo_1 from "../images/swag_logo_1.png";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import Avatar from "@material-ui/core/Avatar";
import VpnKeyTwoToneIcon from "@material-ui/icons/VpnKeyTwoTone";
import VpnKeyRoundedIcon from "@material-ui/icons/VpnKeyRounded";
import "../index.css";

import {
  jello,
  flash,
  rotateInFadeOutUp,
  rotateIn,
  rotateOut,
  fadeOutUp,
  fadeIn,
  fadeOutUp2,
  slideLeft,
  spin,
} from "../shared/_Keyframes";

const S = {};
S.AppContainer = styled.div`
  /* border: 2px red solid; */
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;
  background-color: #f2f3f3;
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
`;
S.HeaderLogo = styled.img`
  padding: 20px;
  width: 400px;
  object-fit: contain;

  /* background-color: #333333; */
`;

S.Button = styled(Button)`
  background-color: white !important;
  border: 2px solid #440099 !important;
  color: #440099 !important;
  font-weight: bold !important;
  /* position: absolute; */
  margin: 0 !important;
  right: -10vw;
  display: ${(props) => props.display};
  animation-name: ${(props) =>
    props.animation === "slideLeft" ? slideLeft : ""};
  transform-origin: center;
  animation-duration: 1.2s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  /* font-family: "Viaoda Libre", cursive !important; */
  /* align-self: flex-end;
  justify-self: flex-end; */
`;
S.Tooltip = styled(Tooltip)``;

S.ExmapleText = styled.p`
  border: 2px purple solid;
`;

S.WalletConnect = styled(Button)`
  width: 180px;
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

S.WalletConnectContain = styled.span`
  display: flex;
  justify-content: center;
  margin-top: 30vh;
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

const App = () => {
  const [connected, setConnected] = useState(0);
  const [open, setOpen] = React.useState(false);

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

  return (
    <S.AppContainer>
      <S.LoaderContainer>
        <S.LoaderImage />
      </S.LoaderContainer>
      <S.Header>
        <S.HeaderLogo src={swag_logo_1} />
        <S.Tooltip
          disableFocusListener
          disableTouchListener
          title="Account: 0xd53CDbdD044bc9d58F6043ff7868A546A9FD2700 "
        >
          <S.Button
            animation={connected ? "slideLeft" : ""}
            disableRipple
            display={connected ? "inline!important" : "none!important"}
          >
            Connected
          </S.Button>
        </S.Tooltip>
      </S.Header>
      <S.WalletConnectContain>
        <S.WalletConnectText animation={connected ? "fadeOutUp2" : ""}>
          Connect
        </S.WalletConnectText>
        <S.WalletConnectAvatar
          animation={!connected ? "fadeIn" : ""}
          onClick={(event) => connectWallet(event)}
          tabIndex="1"
        >
          <S.VpnKeyTwoToneIcon />
        </S.WalletConnectAvatar>
        <S.WalletConnectText animation={connected ? "fadeOutUp2" : ""}>
          Wallet
        </S.WalletConnectText>
      </S.WalletConnectContain>
    </S.AppContainer>
  );
};

export default App;
