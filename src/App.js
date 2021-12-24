import React from "react";
import GlobalStyles from "./components/GlobalStyles";
import styled from "styled-components";
import "./styles/css/signup.css";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configureStore";

import Signup from "./page/Singup";

function App() {
  return (
    <React.Fragment>
      <GlobalStyles />
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Signup} />
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
