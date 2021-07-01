//*Importing from React and from installed Styled Components Libary.
import React from "react";
import styled from "styled-components/macro";

//*Importing Swag Logo for loading screen & animations from _Keyframes file.
import swag_logo_2 from "../images/swag_logo_2.jpg";
import { rotateIn, fadeOutUp } from "../shared/_Keyframes";

//*Setting Styled Components.
const S = {};
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

export const PageLoader = () => {
  return (
    <S.LoaderContainer>
      <S.LoaderImage />
    </S.LoaderContainer>
  );
};
