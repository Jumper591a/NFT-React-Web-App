//*Importing from React and from installed Styled Components Libary.
// import React, { useState, useEffect, useRef } from "react";
// import styled, { css } from "styled-components/macro";
import React, { useState } from "react";
import styled from "styled-components/macro";

import { useDispatch, useSelector } from "react-redux";

import { setNetwork, setToast, resetToast } from "../store/index";

//*Importing ContextTheme(for passing data to other components), animations,
//*and helper functions from shared folder.
// import { contextTheme } from "../shared/_Constants";
import { ZoomIn } from "../shared/_Keyframes";

//*Importing Functional Components to build page.
import { Header } from "./Header";
import { PageLoader } from "./PageLoader";
import { ConnectWallet } from "./ConnectWallet";
import { InputForm } from "./InputForm";
import { ResultForm } from "./ResultForm";

//*
import { Alert, AlertTitle } from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";

//*Importing Index.js because its the only way I know of importing Google fonts.
import "../index.css";

//*Setting Styled Components.
const S = {};
S.AppContainer = styled.div`
  /* border: 2px red solid; */
  display: flex;
  flex-direction: column;
  position: relative;

  height: 100vh;
  background-color: #ffffff;
  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    border: 1px double rgb(255, 255, 255);
    padding: 2px 0;
    background-color: #f3f3f3;
    border-top-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px #c7c7c7;
    background-color: #fe3c7380;
    border: 1px solid rgb(255, 255, 255);
    border-top-left-radius: 3px;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    border-top-right-radius: 3px;
    /* visibility: hidden; */
  }

  body:hover::-webkit-scrollbar-thumb {
    visibility: visible;
  }

  &:hover {
    background: white;
    box-shadow: 0px 2px 33px 0px rgba(0, 0, 0, 0.02);
  }
  & a {
    color: #0060b6;
    text-decoration: none;
  }
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
S.Error = styled.div`
  /* border: 2px red solid; */
  display: ${(props) => (props.status ? "inline" : "none")};

  & .MuiAlert-standardError {
    color: white;
    background-color: #333333;
  }

  & .MuiAlert-standardInfo {
    color: #333333;
  }

  & .MuiAlert-standardError .MuiTypography-root {
    color: #fc3390;
  }

  & .MuiAlert-standardInfo .MuiTypography-root {
    color: rgb(13, 60, 97);
  }

  & .MuiSnackbar-anchorOriginBottomCenter {
    /* bottom: 50vh; */
    width: 100%;
  }

  & .MuiAlert-root {
    font-size: 0.875rem;
  }
  & .MuiAlert-standardError .MuiAlert-icon path {
    color: red;
    /* stroke: red; */
  }
`;

const App = () => {
  //!Declaring Variables for passing via ContextTheme to other react components.
  // const context_input_form = { mint, formData, setFormData, file, selectFile };
  // const context_result_form = { ipfsData, nftLoading };

  const { status } = useSelector((state) => state.connectWallet);
  const toast = useSelector((state) => state.toast);

  const dispatch = useDispatch();

  const metaMask = window.ethereum;
  // const [toast, setToast] = useState(false);

  const toastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(resetToast());
  };

  if (metaMask)
    metaMask.on("chainChanged", (chainId) => {
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have good reason not to.
      // window.location.reload();
      dispatch(resetToast());
      if (chainId === "0x13881") dispatch(setNetwork("matic_test"));
      else if (chainId === "0x4") dispatch(setNetwork("rinkeby_test"));
      else {
        dispatch(setNetwork(""));
        dispatch(
          setToast({
            status: true,
            type: "",
            message:
              "Error: Rinkeby or Mumbai is not selected as network on Metamask extension.",
            message2:
              "Make sure Rinkeby or Mumbai Network is selected on MetaMask Extension!",
          })
        );
      }
      console.log("onchange", chainId);
    });

  return (
    <S.AppContainer>
      <PageLoader />
      <Header />
      <ConnectWallet />
      <S.Error status={status ? "1" : ""}>
        <Snackbar
          open={toast.status}
          autoHideDuration={20000}
          onClose={toastClose}
          // anchorOrigin={{
          //   horizontal: "center",
          //   vertical: "bottom",
          // }}
        >
          <Alert onClose={toastClose} severity="info">
            <AlertTitle>{toast.message}</AlertTitle>
            {toast.type ? (
              <a href={toast.message2} target="_blank" rel="noreferrer">
                <strong>{toast.message2}</strong>
              </a>
            ) : (
              <strong>{toast.message2}</strong>
            )}
          </Alert>
        </Snackbar>
      </S.Error>

      <S.FlexContainer animation={status ? "ZoomIn" : ""}>
        {/* <contextTheme.Provider value={context_input_form}> */}
        <InputForm />
        {/* </contextTheme.Provider> */}

        {/* <contextTheme.Provider value={context_result_form}> */}
        <ResultForm />
        {/* </contextTheme.Provider> */}
      </S.FlexContainer>
    </S.AppContainer>
  );
};

export default App;
