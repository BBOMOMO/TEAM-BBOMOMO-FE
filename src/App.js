import React from "react";
import GlobalStyles from "./components/GlobalStyles";

import { Route } from "react-router-dom";

import "./styles/css/login.css";
import "./styles/css/signup.css";
import "./styles/css/groupbx.css";
import "./styles/css/grouprecommend.css";
import "./styles/css/timer.css";
import Login from "./page/Login";
import GroupList from "./page/GroupList";
import Signup from "./page/Singup";
import PostChat from "./components/PostChat";
import GroupRecommend from "./components/GroupRecommend";
import GroupRoomTimer from "./components/GroupRoomTimer";

function App() {
  return (
    <>
      <GlobalStyles />
      <Route path="/" exact component={Signup} />
      <Route path="/login" exact component={Login} />
      <Route path="/list" exact component={GroupList} />
      <Route path="/chat" exact component={PostChat} />
      <Route path="/groupreco" exact component={GroupRecommend} />
      <Route path="/timer" exact component={GroupRoomTimer} />
    </>
  );
}

export default App;
