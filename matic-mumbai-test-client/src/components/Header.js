//*Importing from React and from installed Styled Components Libary.
import React, { useContext } from "react";
import styled from "styled-components/macro";

//*Importing Swag Logo Header & animations from _Keyframes file.
import swag_logo_1 from "../images/swag_logo_1.png";
import { display } from "../shared/_Keyframes";

//*Importing Material-UI components from the Installed Material UI library.
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

//*Importing ContextTheme (to pass state data to components).
import { contextTheme } from "../shared/_Constants";

//*Setting Styled Components.
const S = {};
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

export const Header = () => {
  //*Getting important state data via ContextTheme.
  const connected = useContext(contextTheme);

  return (
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
  );
};