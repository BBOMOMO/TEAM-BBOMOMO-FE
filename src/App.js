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
import "./styles/css/certificationModal.css";
import "./styles/css/video.css";
import Login from "./page/Login";
import Signup from "./page/Singup";
import PostChat from "./components/PostChat";
import Group from "./page/Group";
import Header from "./components/Header";
import Main from "./page/Main";
import StudyCertificationModal from "./components/StudyCertificationModal";
import VideoChat from "./components/VideoChat";

function App() {
  return (
    <>
      <GlobalStyles />

      <Route path="/" exact component={Signup} />
      <Route path="/login" exact component={Login} />
      <Header />
      <Route path="/chat" exact component={PostChat} />
      <Route path="/group" exact component={Group} />
      <Route path="/main" exact component={Main} />
      <Route path="/studymodal" exact component={StudyCertificationModal} />
      <Route path="/video" exact component={VideoChat} />
    </>
  );
}

export default App;
