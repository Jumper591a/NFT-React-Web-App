import React from 'react';
import styled from "styled-components/macro";
import swag_logo_2 from "../images/swag_logo_2.jpg";


const S = {};
S.AppContainer = styled.div`
  border: 2px red solid;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

S.LoaderImage = styled.div`
  position: relative;
  margin: auto;
  background-size: cover;
  background-position: center;
  box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.1);
  background-image: ${swag_logo_2};
  border: 2px blue solid;
`;


const App = () => {
  return (
    <S.AppContainer>
     <S.LoaderImage/>
    </S.AppContainer>
  );
}

export default App;
