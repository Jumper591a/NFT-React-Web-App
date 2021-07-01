//*Importing from React and from installed Styled Components Libary.
import React, { useContext, useState } from "react";
import styled from "styled-components/macro";

//*Importing Material-UI components from the Installed Material UI library.
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import FormControl from "@material-ui/core/FormControl";

//*Importing ContextTheme (to pass state data to components) & Importing Keyframe animations for element effects.
import { contextTheme } from "../shared/_Constants";
import {
  rubberBand,
  shakeY,
  fadeInUp2,
  colorRotate,
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
  const { mint, formData, setFormData, selectFile, file } =
    useContext(contextTheme);

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

  const [media, setMedia] = useState(false);
  const [formFile, setFormFile] = useState(false);

  return (
    <S.FormInput>
      <S.FormTitle fontSize="15px" marginTop="20px">
        Matic-Mumbai Test Network
      </S.FormTitle>

      <S.FormTitle>Mint your NFT</S.FormTitle>

      <S.TextField
        id="outlined-basic"
        label="Name"
        value={formData.nftName}
        variant="outlined"
        onChange={(event) =>
          setFormData({
            swagType: formData.swagType,
            nftName: event.target.value,
            nftDescription: formData.nftDescription,
          })
        }
        error={media && !formData.nftName ? true : false}
        helperText={
          media && !formData.nftName ? "Give the NFT a Name Property" : ""
        }
      />

      <S.FormControl variant="outlined">
        <InputLabel
          id="demo-simple-select-outlined-label"
          error={media && !formData.swagType ? true : false}
        >
          {media && !formData.swagType
            ? "Give the NFT a Swag Type Property"
            : "Swag Type"}
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
        value={formData.nftDescription}
        variant="outlined"
        onChange={(event) =>
          setFormData({
            swagType: formData.swagType,
            nftName: formData.nftName,
            nftDescription: event.target.value,
          })
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
        borderColor="white"
        color="#440099"
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
          <S.FileDetails animation={media && !file ? true : false}>
            🔍🤔 Attach a media source ? . . .
          </S.FileDetails>
        </S.FileDetailsBox>
      )}

      <S.FileDetailsBox
        margin={
          media && (!formData.nftName || !formData.nftDescription)
            ? "30px"
            : "60px"
        }
      >
        <S.FileDetails
          animation={
            formFile &&
            formData.swagType &&
            formData.nftName &&
            formData.nftDescription
              ? true
              : false
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
        bold="bolder"
        boarderColor="#440099"
        onClick={(event) => {
          event.preventDefault();
          setMedia(true);
          if (
            file &&
            formData.swagType &&
            formData.nftName &&
            formData.nftDescription
          ) {
            setFormFile(false);
            setMedia(false);
            mint();
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
              ? true
              : false
          }
        >
          ⮵ &nbsp; <span>Mint when you are ready</span> &nbsp; ⮴
        </S.FileDetails>
      </S.FileDetailsBox>
    </S.FormInput>
  );
};
