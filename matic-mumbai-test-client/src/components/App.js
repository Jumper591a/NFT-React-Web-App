//*Importing from React and from installed Styled Components Libary.
import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components/macro";

import { useFileUpload } from "use-file-upload";

//*Importing ContextTheme(for passing data to other components), animations,
//*and helper functions from shared folder.
import { contextTheme } from "../shared/_Constants";
import { ZoomIn } from "../shared/_Keyframes";
import { mintToNetwork } from "../shared/_HelperFunctions";

//*Importing Functional Components to build page.
import { Header } from "./Header";
import { PageLoader } from "./PageLoader";
import { ConnectWallet } from "./ConnectWallet";
import { InputForm } from "./InputForm";
import { ResultForm } from "./ResultForm";

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

const App = () => {
  //*Setting State for key logic to running the web application.
  const [connected, setConnected] = useState({ status: false, account: "" });
  const [formData, setFormData] = useState({
    swagType: "",
    nftName: "",
    nftDescription: "",
  });
  const [ipfsData, setIpfsData] = useState({
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
  const [nftLoading, setNftLoading] = useState(false);

  //*State management for activating with the installed helper react component for
  //*grabbing user submitted media data.
  const [file, selectFile] = useFileUpload();

  //*Function for Minting token onto the network.
  const mint = async () => {
    mintToNetwork(
      formData,
      file,
      connected,
      setNftLoading,
      setFormData,
      setIpfsData
    );
  };

  //!Declaring Variables for passing via ContextTheme to other react components.
  const context_input_form = { mint, formData, setFormData, file, selectFile };
  const connection = { connected, setConnected };
  const context_result_form = { ipfsData, nftLoading };

  return (
    <S.AppContainer>
      <PageLoader />

      <contextTheme.Provider value={connected}>
        <Header />
      </contextTheme.Provider>

      <contextTheme.Provider value={connection}>
        <ConnectWallet />
      </contextTheme.Provider>

      <S.FlexContainer animation={connected.status ? "ZoomIn" : ""}>
        <contextTheme.Provider value={context_input_form}>
          <InputForm />
        </contextTheme.Provider>

        <contextTheme.Provider value={context_result_form}>
          <ResultForm />
        </contextTheme.Provider>
      </S.FlexContainer>
    </S.AppContainer>
  );
};

export default App;
