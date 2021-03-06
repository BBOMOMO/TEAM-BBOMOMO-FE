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
import Group from "./page/Group";
import Kakao from "./shared/social/Kakao";
import Google from "./shared/social/Google";

import Main from "./page/Main";
import NotFound from "./page/NotFound";
import Certification from "./components/Certification";
import VideoChatRoom from "./components/VideoChatRoom";
import { useSelector, useDispatch } from "react-redux";
import VideoCloseModal from "./components/VideoEndModal";

function App() {
  return (
    <>
      <GlobalStyles />

      <Switch>
        <Route path="/signup" component={Signup} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/api/v1/auth/kakao/callback" component={Kakao}></Route>
        <Route path="/api/v1/auth/google/callback" component={Google}></Route>
        <Route path="/" component={Main} exact />
        <Route path="/video/:roomId" exact component={VideoChatRoom} />

        <Route path="/modal" component={VideoCloseModal} />
        <Route path={"*"} component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
