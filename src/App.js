import React from "react";
import GlobalStyles from "./components/GlobalStyles";

import { Switch, Route } from "react-router-dom";
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
import Kakao from "./shared/social/Kakao";

import Main from "./page/Main";
import NotFound from "./page/NotFound";
import Certification from "./components/Certification";
import VideoComponent from "./components/VideoComponent";
import VideoChatRoom from "./components/VideoChatRoom";
import Video from "./components/Video";
import { useSelector, useDispatch } from "react-redux";
import VideoModal from "./components/VideoModal";

function App() {
  return (
    <>
      <GlobalStyles />

      <Switch>
        <Route path="/signup" component={Signup} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/api/v1/auth/kakao/callback" component={Kakao}></Route>
        <Route path="/" component={Main} exact />
        <Route path="/chat/:roomId" component={PostChat} exact />
        <Route path="/video/:roomId" exact component={VideoChatRoom} />

        <Route path="/modal" component={VideoModal} />
        <Route path={"*"} component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
