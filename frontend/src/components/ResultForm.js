//*Importing from React and from installed Styled Components Libary.
import React from "react";
import styled from "styled-components/macro";

import { useSelector } from "react-redux";

//*Importing from shared folder
//? import { contextTheme } from "../shared/_Constants";

import {
  three,
  colorRotate,
  lightSpeedInLeft,
  fadeInUp2,
  ZoomIn,
} from "../shared/_Keyframes";

//*Installed React Components.
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import VideoLooper from "react-video-looper";

//*Setting Styled Components.
const S = {};
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

S.Flex = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: ${(props) => (props.flexDirection ? "column" : "row")};
  justify-content: ${(props) => (props.flexDirection ? "center" : "normal")};
  align-items: ${(props) => (props.flexDirection ? "center" : "normal")};
  margin-top: ${(props) => (props.marginTop ? "40%" : "0px")};
  opacity: 0;
  animation-name: ${(props) =>
    props.animation === "fadeInUp2"
      ? fadeInUp2
      : props.animation === "lightSpeedInLeft"
      ? lightSpeedInLeft
      : ZoomIn};
  animation-duration: 1.5s;
  animation-timing-function: ease-in-out;
  animation-delay: ${(props) => (props.delay ? props.delay : "")};
  animation-fill-mode: forwards;

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
  margin: ${(props) => (props.margins ? props.margins : "0")};
  margin-top: ${(props) => (props.margin ? props.margin : "15px")};

  &#main-FileDetailsBox {
    justify-content: flex-start;
    align-items: flex-start;
    /* border: 2px green solid; */
  }
`;

S.NftLoadingDetails = styled.div`
  color: ${(props) => (props.color ? props.color : "white")};
  text-align: center;
  font-family: "Montserrat", sans-serif;
  font-weight: ${(props) => (props.bold ? props.bold : "100")};
  padding: ${(props) => (props.padding ? `${props.padding} 0px ` : "white")};

  /* -webkit-text-stroke: ${(props) =>
    props.bold ? "0.1px #0096FF" : "0px transparent"}; */

  font-size: ${(props) => (props.fontSize ? props.fontSize : "1.17em")};
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

export const ResultForm = () => {
  //*Context Theme passing data here.
  // const { nftLoading, ipfsData } = useContext(contextTheme);
  const ipfsData = useSelector((state) => state.ipfsData);
  const nftLoading = useSelector((state) => state.nftLoading);

  //*Helper Function for displaying Count down timer correctly.
  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return (
        <S.FileDetailsBox margin="0px">
          <S.NftLoadingDetails color="true" bold="bolder" fontSize="30px">
            FINISH !
          </S.NftLoadingDetails>
        </S.FileDetailsBox>
      );
    } else {
      return (
        <S.FileDetailsBox margins="10px">
          <S.NftLoadingDetails>
            {remainingTime <= 20 && remainingTime >= 16
              ? "Decentralizing"
              : remainingTime <= 15 && remainingTime >= 11
              ? "Minting Token"
              : remainingTime <= 10 && remainingTime >= 6
              ? "Getting Token"
              : remainingTime <= 5
              ? "Getting Metadata"
              : ""}
          </S.NftLoadingDetails>
          <S.NftLoadingDetails padding="5px" color="true" fontSize="40px">
            {remainingTime}
          </S.NftLoadingDetails>
          <S.NftLoadingDetails>
            {remainingTime <= 20 && remainingTime >= 16
              ? "Data to IPFS"
              : remainingTime <= 15 && remainingTime >= 11
              ? "With IPFS Hash"
              : remainingTime <= 10 && remainingTime >= 6
              ? "stored IPFS Hash"
              : remainingTime <= 5
              ? "From IPFS"
              : ""}
          </S.NftLoadingDetails>
        </S.FileDetailsBox>
      );
    }
  };

  return (
    <S.FormResult>
      {nftLoading && (
        <S.Flex flexDirection="true" marginTop="true">
          <CountdownCircleTimer
            isPlaying
            duration={20}
            colors={[["#FB2B14", 0.33], ["#E4FB14", 0.33], ["#14E4FB"]]}
            onComplete={() => [true, 1000]}
            size={250}
          >
            {renderTime}
          </CountdownCircleTimer>
        </S.Flex>
      )}

      {[ipfsData.status && !nftLoading].includes(true) && (
        <S.Flex flexDirection="true" animation={"fadeInUp2"}>
          <S.NftName>{ipfsData.title}</S.NftName>

          <S.Flex id="first-child-Flex" animation={"lightSpeedInLeft"}>
            <S.ResultDetails color="#fc3290">Description: </S.ResultDetails>
            <S.ResultDetails> {ipfsData.description} </S.ResultDetails>
          </S.Flex>

          <S.Flex animation={"lightSpeedInLeft"} delay=".5s">
            <S.ResultDetails color="#fc3290">Swag Type: </S.ResultDetails>
            <S.ResultDetails>
              {ipfsData.swagType.includes("Art")
                ? `${ipfsData.swagType} 🎨🖌️`
                : ipfsData.swagType.includes("Music")
                ? `${ipfsData.swagType} 🎵`
                : ipfsData.swagType.includes("Apparel")
                ? `${ipfsData.swagType} 👕`
                : ipfsData.swagType.includes("Accessories")
                ? `${ipfsData.swagType} 👓`
                : ipfsData.swagType}
            </S.ResultDetails>
          </S.Flex>

          <S.Flex animation={"lightSpeedInLeft"} delay="1.0s">
            <S.ResultDetails color="#fc3290">Swag Score: </S.ResultDetails>
            <S.ResultDetails animation="'lightSpeedInLeft'">
              {ipfsData.swagScore}
            </S.ResultDetails>
          </S.Flex>

          <S.Flex animation={"lightSpeedInLeft"} delay="1.5s">
            <S.ResultDetails color="#fc3290">Legacy: </S.ResultDetails>
            <S.ResultDetails>
              {ipfsData.legacy.includes("Rockstar")
                ? `🤘 ${ipfsData.legacy}`
                : ipfsData.legacy}
            </S.ResultDetails>
          </S.Flex>

          <S.Flex animation={"lightSpeedInLeft"} delay="2.0s">
            <S.ResultDetails color="#fc3290">Swag Level: </S.ResultDetails>
            <S.ResultDetails>
              {ipfsData.swagLevel.includes("Ice")
                ? `${ipfsData.swagLevel} 🧊`
                : ipfsData.swagLevel}
            </S.ResultDetails>
          </S.Flex>

          <S.Flex flexDirection="true" animation={"ZoomIn"} delay="2.5s">
            {ipfsData.video && (
              <S.VideoLooper
                source={ipfsData.imageUrl}
                start={0.0}
                end={6.9}
                muted={true}
                autoplay={true}
                loopCount={15}
                isDebugMode={false}
              />
            )}

            {ipfsData.image && (
              <S.NftImage src={ipfsData.imageUrl}></S.NftImage>
            )}
          </S.Flex>
        </S.Flex>
      )}
    </S.FormResult>
  );
};
