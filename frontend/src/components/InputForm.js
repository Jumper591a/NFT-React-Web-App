//*Importing from React and from installed Styled Components Libary.
import React, { useRef, useState } from "react";
import styled from "styled-components/macro";
import { useDispatch, useSelector } from "react-redux";

//? import { CSSTransition } from "react-transition-group"

import {
  CONTRACT_ADDRESS_MATIC_TEST,
  CONTRACT_ADDRESS_RINKEBY_TEST,
} from "../shared/_Constants";

//* Helper Library for the user to upload media
import { useFileUpload } from "use-file-upload";

import { mintToNetwork } from "../shared/_HelperFunctions";

import { setFormData, setFormEmpty } from "../store/index";

//*Importing Material-UI components from the Installed Material UI library.
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import FormControl from "@material-ui/core/FormControl";

//*Importing ContextTheme (to pass state data to components) & Importing Keyframe animations for element effects.
//? import { contextTheme } from "../shared/_Constants";
import {
  rubberBand,
  shakeY,
  fadeInUp2,
  colorRotate,
  heartBeat,
} from "../shared/_Keyframes";

//*Setting Styled Components.
const S = {};
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

S.FormTitle = styled.h2`
  color: white;
  text-align: center;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "35px")};
  font-family: "Montserrat", sans-serif;
  animation-name: ${(props) => (props.animation ? heartBeat : "")};
  transform-origin: center;
  animation-duration: 1.3s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
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

S.StyledBtn = styled(Button)`
  .MuiTouchRipple-root {
    /* border: 2px #440099 groove; */
  }
  &.MuiButton-root {
    margin-top: ${(props) => (props.margin ? props.margin : "10px")};
    background-color: #ffffff;
    border: ${(props) =>
        props.animation !== "shakeY" && props.ready ? "6px double" : "groove"}
      ${(props) => (props.boardercolor ? props.boardercolor : "white")};

    &:hover {
      background-color: #ffffff;
      border: ${(props) =>
        props.animation !== "shakeY" && props.ready ? "6px double" : "groove"};

      border-color: ${(props) =>
        props.boardercolor ? props.boardercolor : "white"};

      animation-name: ${(props) =>
        props.animation === "shakeY" ? shakeY : ""};
      transform-origin: center;
      animation-duration: 1s;
      animation-timing-function: ease-in-out;
    }

    &:focus {
      background-color: #ffffff;
      animation-name: ${(props) =>
        props.animation === "shakeY" ? shakeY : rubberBand};
      transform-origin: center;
      animation-duration: 1s;
      animation-timing-function: ease-in-out;
    }
  }

  & > span.MuiButton-label {
    font-weight: ${(props) => (props.bold ? props.bold : "100")};
    color: #440099;
  }

  & > span {
    color: ${(props) => (props.btncolor ? props.btncolor : "black")};
  }
  & > span:nth-child(2) {
    border: 2px inset
      ${(props) => (props.bordercolor ? props.bordercolor : "transparent")};
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

S.FileDetailsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: ${(props) => (props.margins ? props.margins : "0")};
  margin-top: ${(props) => (props.margin ? props.margin : "15px")};

  &#main-FileDetailsBox {
    justify-content: flex-start;
    align-items: flex-start;
    /* border: 2px green solid; */
  }
`;
S.Flex = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: ${(props) => (props.flexDirection ? "column" : "row")};
  justify-content: ${(props) => (props.flexDirection ? "center" : "normal")};
  align-items: ${(props) => (props.flexDirection ? "center" : "normal")};
  margin-top: ${(props) => (props.marginTop ? "40%" : "auto")};
  animation-name: ${(props) => (props.animation ? fadeInUp2 : "")};
  animation-duration: 1.5s;
  animation-timing-function: ease-in-out;

  & .first-child-FileDetails {
    color: #333333;
    margin-right: 10px;
  }
`;

S.FileDetails = styled.h3`
  color: white;
  text-align: center;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1.17em")};
  animation-name: ${(props) => (props.animation ? colorRotate : "")};
  animation-duration: 1.8s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  & > span {
    color: white !important;
    font-size: 0.8em;
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

export const InputForm = () => {
  //*Getting important state data via ContextTheme.
  // const { mint, formData, setFormData, selectFile, file } =
  //   useContext(contextTheme);
  const dispatch = useDispatch();
  const connectWallet = useSelector((state) => state.connectWallet);
  const { type } = useSelector((state) => state.network);

  const formData = useSelector((state) => state.formData);
  const ipfsData = useSelector((state) => state.ipfsData);
  const nftLoading = useSelector((state) => state.nftLoading);

  const [name, setName] = useState("");
  const [swag, setSwag] = useState("");
  const [desc, setDesc] = useState("");

  const [media, setMedia] = useState(false);
  const [formFile, setFormFile] = useState(false);

  //*State management for activating with the installed helper react component for
  //*grabbing user submitted media data.
  const [file, selectFile] = useFileUpload();

  const dropdownRef = useRef({ value: "" });

  const handleDropDown = (e) => {
    dispatch(
      setFormData({
        swagType: e.target.value,
        nftName: formData.nftName,
        nftDescription: formData.nftDescription,
      })
    );
    dropdownRef.current.value = e.target.value;
  };

  //*Helper Function for collecting user Media data from input form submission.
  const BrowseMedia = (e) => {
    e.preventDefault();

    //*Installed React component for grabbing media files from form.
    selectFile({}, ({ source, name, size, file }) => {
      //? file - is the raw File Object
      console.log(
        "Your Uploaded Content: \n",
        { source, name, size, file },
        "\n"
      );
      setFormFile(true);
    });
  };

  //*Function for Minting token onto the network.
  const mint = async () => {
    if (type === "matic_test") {
      mintToNetwork(
        formData,
        file,
        connectWallet,
        ipfsData,
        nftLoading,
        dispatch,
        CONTRACT_ADDRESS_MATIC_TEST
      );
      setFormFile(false);
    } else if (type === "rinkeby_test") {
      mintToNetwork(
        formData,
        file,
        connectWallet,
        ipfsData,
        nftLoading,
        dispatch,
        CONTRACT_ADDRESS_RINKEBY_TEST
      );
      setFormFile(false);
    }
  };

  return (
    <S.FormInput>
      <S.FormTitle
        fontSize="15px"
        marginTop="20px"
        animation={!type ? "1" : ""}
      >
        {!type && (
          <strong>😱 Wrong Network Type Selected on Metamask! 😱 </strong>
        )}
        {type
          ? type === "rinkeby_test"
            ? "Rinkeby Test Network"
            : "Matic-Mumbai Test Network"
          : ""}
      </S.FormTitle>

      <S.FormTitle>Mint your NFT</S.FormTitle>

      <S.TextField
        id="outlined-basic"
        label="Name"
        value={formData.nftName}
        variant="outlined"
        onChange={(event) =>
          dispatch(
            setFormData({
              swagType: formData.swagType,
              nftName: event.target.value,
              nftDescription: formData.nftDescription,
            })
          )
        }
        error={media && !formData.nftName ? true : false}
        helperText={
          media && !formData.nftName ? "Give the NFT a Name Property" : ""
        }
      />
      <S.FormControl variant="outlined">
        <InputLabel error={media && !formData.swagType ? true : false}>
          {media && !formData.swagType
            ? "Give the NFT a Swag Type Property"
            : "Swag Type"}
        </InputLabel>
        <Select
          ref={dropdownRef}
          value={formData.swagType}
          onChange={(event) =>
            dispatch(
              setFormData({
                swagType: event.target.value,
                nftName: formData.nftName,
                nftDescription: formData.nftDescription,
              })
            )
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
        value={formData.nftDescription}
        variant="outlined"
        onChange={(event) =>
          dispatch(
            setFormData({
              swagType: formData.swagType,
              nftName: formData.nftName,
              nftDescription: event.target.value,
            })
          )
        }
        error={media && !formData.nftDescription ? true : false}
        helperText={
          media && !formData.nftDescription
            ? "Give the NFT a Description Property"
            : ""
        }
      />

      <S.StyledBtn
        variant="contained"
        startIcon={<SearchIcon />}
        animation="shakeY"
        margin=""
        bordercolor="white"
        btncolor="#440099"
        onClick={(event) => {
          BrowseMedia(event);
          // setMedia(!media);
        }}
      />

      {file && formFile ? (
        <S.FileDetailsBox id="main-FileDetailsBox">
          <S.Flex>
            <S.FileDetails className="first-child-FileDetails">
              File:
            </S.FileDetails>
            <S.FileDetails>{file.name}</S.FileDetails>
          </S.Flex>
          <S.Flex>
            <S.FileDetails className="first-child-FileDetails">
              Size:
            </S.FileDetails>
            <S.FileDetails>{file.size} KB </S.FileDetails>
          </S.Flex>
        </S.FileDetailsBox>
      ) : (
        <S.FileDetailsBox>
          <S.FileDetails animation={media && !formFile ? "true" : ""}>
            🔍🤔 Attach a media source ? . . .
          </S.FileDetails>
        </S.FileDetailsBox>
      )}

      <S.FileDetailsBox margin={"30px"}>
        <S.FileDetails
          animation={
            formFile &&
            formData.swagType &&
            formData.nftName &&
            formData.nftDescription
              ? "true"
              : ""
          }
        >
          ⮷ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp;
          &nbsp;⮶
        </S.FileDetails>
      </S.FileDetailsBox>

      <S.StyledBtn
        variant="outlined"
        color="primary"
        href="#outlined-S.StyledBtns"
        animation="rubberBand"
        ready={
          formFile &&
          formData.swagType &&
          formData.nftName &&
          formData.nftDescription
            ? "true"
            : ""
        }
        bold="bolder"
        boardercolor="#440099"
        onClick={(event) => {
          event.preventDefault();
          setMedia(true);
          if (
            formFile &&
            formData.swagType &&
            formData.nftName &&
            formData.nftDescription &&
            type
          ) {
            setMedia(false);
            dispatch(setFormEmpty());
            dropdownRef.current.value = "";
            mint();
          } else {
            console.log(
              formFile,
              media,
              formData.swagType,
              formData.nftName,
              formData.nftDescription
            );
          }
        }}
      >
        MINT
      </S.StyledBtn>

      <S.FileDetailsBox>
        <S.FileDetails
          animation={
            formFile &&
            formData.swagType &&
            formData.nftName &&
            formData.nftDescription
              ? "true"
              : ""
          }
        >
          ⮵ &nbsp; <span>Mint when you are ready</span> &nbsp; ⮴
        </S.FileDetails>
      </S.FileDetailsBox>
    </S.FormInput>
  );
};
