import React from "react";
import GlobalStyles from "./components/GlobalStyles";

import { Route } from "react-router-dom";
import "./styles/css/login.css";
import "./styles/css/signup.css";
import "./styles/css/group.css";
import "./styles/css/grouprecommend.css";
import "./styles/css/timer.css";
import "./styles/css/myInfo.css";
import "./styles/css/userview.css";
import Login from "./page/Login";
import GroupList from "./page/GroupList";
import Signup from "./page/Singup";
import PostChat from "./components/PostChat";
import GroupRoomTimer from "./components/GroupRoomTimer";
import Header from "./components/Header";
import UserView from "./components/UserView";
import Main from "./page/Main";

function App() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Route path="/" exact component={Signup} />
      <Route path="/login" exact component={Login} />
      <Route path="/list" exact component={GroupList} />
      <Route path="/chat" exact component={PostChat} />
      <Route path="/timer" exact component={GroupRoomTimer} />
      <Route path="/userview" exact component={UserView} />
      <Route path="/main" exact component={Main} />
    </>
  );
}

export default App;
