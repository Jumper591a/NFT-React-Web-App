//*Importing from React and from installed Styled Components Libary.
import React, { useContext, useState } from "react";
import styled from "styled-components/macro";

//*Importing Ethers from Installed Ethers Libary.
import { ethers } from "ethers";

//*Importing Ethers from Installed Ethers Libary.
import Avatar from "@material-ui/core/Avatar";
import VpnKeyRoundedIcon from "@material-ui/icons/VpnKeyRounded";
import { Alert, AlertTitle } from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";

//*Importing ContextTheme (to pass state data to components) & Importing Keyframe animations for element effects.
import { contextTheme } from "../shared/_Constants";
import {
  jello,
  rotateOut,
  fadeIn,
  fadeOutUp2,
  hidden,
  rollIn,
} from "../shared/_Keyframes";

//*Setting Styled Components.
const S = {};
S.WalletConnectContain = styled.span`
  position: fixed;
  bottom: 50vh;
  left: 50vw;
  right: 50vw;
  animation-name: ${(props) => (props.animation ? hidden : "")};
  transform-origin: center;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-delay: 0.2s;

  & .MuiAlert-standardError {
    color: white;
    background-color: #333333;
  }
  & .MuiSnackbar-anchorOriginBottomCenter {
    bottom: 50vh;
    width: 100%;
  }

  & .MuiAlert-root {
    font-size: 2.875rem;
  }
  & .MuiAlert-standardError .MuiAlert-icon path {
    color: red;
    /* stroke: red; */
  }
  & .MuiTypography-root {
    color: #fc3390;
  }
`;

S.Flex = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  animation-name: ${(props) => (props.animation ? fadeIn : "")};
  transform-origin: center;
  animation-duration: 3.2s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-delay: 0.8s;
  z-index: -1;
  opacity: 0;
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

export const ConnectWallet = () => {
  //*Getting important state data via ContextTheme.
  const { connected, setConnected } = useContext(contextTheme);
  const [toast, setToast] = useState(false);

  //*Storing Ether information for getting the account ID later on.
  const metaMask = window.ethereum;
  const provider = metaMask
    ? new ethers.providers.Web3Provider(metaMask)
    : false;
  const providerRPC = new ethers.providers.JsonRpcProvider();

  const toastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToast(false);
  };

  //*Checking if window.etherum is detected in the browser (if not then Metamask needs to be installed) & getting Account ID.
  const connectWallet = async (e) => {
    e.preventDefault();
    if (typeof metaMask === "undefined") {
      setToast(true);
    } else {
      const accounts = await metaMask.request({
        method: "eth_requestAccounts",
      });

      //*Grabbing Account to use for Token Minting & some added information variables.
      const account = accounts[0];
      const blockNumber = await provider.getBlockNumber();
      const balance = await provider.getBalance(account);
      const bigNumberFormatter = ethers.utils.formatEther(balance);
      const userInputFormatted = ethers.utils.parseEther("1.0");

      //*Setting Connected State with true and the metamask Account ID.
      setConnected({ status: true, account: account });
    }
  };

  return (
    <S.WalletConnectContain animation={connected.status ? true : false}>
      <Snackbar
        open={toast}
        autoHideDuration={6000}
        onClose={toastClose}
        // anchorOrigin={{
        //   horizontal: "center",
        //   vertical: "bottom",
        // }}
      >
        <Alert onClose={toastClose} severity="error">
          <AlertTitle>
            Error: MetaMask not detected within the browser.
          </AlertTitle>

          <strong>Please Install Metamask!</strong>
        </Alert>
      </Snackbar>
      <S.Flex animation={true}>
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
      </S.Flex>
    </S.WalletConnectContain>
  );
};
