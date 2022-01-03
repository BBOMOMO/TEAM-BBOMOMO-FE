import React from "react";
import GlobalStyles from "./components/GlobalStyles";

import {  Switch, Route } from "react-router-dom";
import "./styles/css/login.css";
import "./styles/css/signup.css";
import "./styles/css/group.css";
import "./styles/css/grouprecommend.css";
import "./styles/css/timer.css";
import "./styles/css/myInfo.css";
import "./styles/css/userview.css";
import "./styles/css/video.css";
import "./styles/css/certification.css";
import Login from "./page/Login";
import Signup from "./page/Singup";
import PostChat from "./components/PostChat";
import Group from "./page/Group";
import Header from "./components/Header";
import Main from "./page/Main";
import NotFound from "./page/NotFound";
import CertificationWrite from "./components/CertificationWrite";
import CertificationComment from "./components/CertificationComment";
import Certification from "./components/Certification";

function App() {
  return (
   <>
    <GlobalStyles />
    <Route path="/signup" component={Signup} exact/>
    <Route path="/login" component={Login} exact />    
    <Header />
    <Switch>
      <Route path="/" component={Main} exact/>
      <Route path="/chat" component={PostChat} exact/>
      <Route path="/group" component={Group} exact/>

      <Route path="/writemodal" component={CertificationWrite} exact/>
      <Route path="/commentmodal" component={CertificationComment} exact/>
      <Route path="/certifi" component={Certification} exact/>
      <Route path={"*"} component={NotFound}/>
    </Switch>
    </>
  );
}

export default App;
