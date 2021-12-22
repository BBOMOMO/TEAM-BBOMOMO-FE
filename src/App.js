import React from "react";
import GlobalStyles from "./components/GlobalStyles";
import styled from "styled-components";

function App() {
  return (
    <React.Fragment>
      <GlobalStyles />
      <Test>123123132안녕하세요</Test>
    </React.Fragment>
  );
}

export default App;

const Test = styled.div`
  font-size: 20px;
`;
