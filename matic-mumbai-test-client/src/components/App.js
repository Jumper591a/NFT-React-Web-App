import React from 'react';
import styled from "styled-components/macro";


const S = {};
S.AppContainer = styled.div`
  border: 2px yellow solid;
`;


const App = () => {
  return (
    <S.AppContainer>
      <p> Hello World! ! !</p>
    </S.AppContainer>
  );
}

export default App;
