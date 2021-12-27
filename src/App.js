import React from "react";
import GlobalStyles from "./components/GlobalStyles";

import { Route } from "react-router-dom";

import "./styles/css/login.css";
import "./styles/css/signup.css";
import "./styles/css/groupbx.css";
import Login from "./page/Login";
import GroupList from "./page/GroupList";
import Signup from "./page/Singup";
import PostChat from "./components/PostChat";
import GroupBx from "./components/GroupBx";
import Header from "./components/Header";

function App() {

  return (
    <>
      <GlobalStyles />
      <Header/>
      <Route path="/" exact component={Signup} />
      <Route path="/login" exact component={Login} />
      <Route path="/list" exact component={GroupList} />
      <Route path="/chat" exact component={PostChat} />
      <Route path="/glist" exact component={GroupBx} />
    </>
  );
}

export default App;
