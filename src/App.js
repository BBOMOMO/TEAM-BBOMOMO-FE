import React from "react";
import GlobalStyles from "./components/GlobalStyles";

import { Route } from "react-router-dom";

import "./styles/css/signup.css";
import GroupList from "./page/GroupList";
import Signup from "./page/Singup";
import PostChat from "./components/PostChat";

function App() {
  return (
    <>
      <GlobalStyles />
      <Route path="/list" exact component={GroupList} />
      <Route path="/" exact component={Signup} />
      <Route path="/chat" exact component={PostChat} />
    </>
  );
}

export default App;
