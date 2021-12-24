import React from "react";
import GlobalStyles from "./components/GlobalStyles";

import {Route} from "react-router-dom";

import io from "socket.io-client";
// import "./styles/css/signup.css";
import "./styles/css/login.css";
// import GroupList from "./page/GroupList";
// import Signup from "./page/Singup";
import Login from "./page/Login";

function App() {
  const socket = io.connect("http://13.209.4.79:3000/");
  console.log(socket);
  return (
    <>
      <GlobalStyles />
      {/* <Route path="/list" exact component={GroupList} /> */}
      {/* <Route path="/" exact component={Signup} /> */}
      <Route path="/login" exact component={Login} />
    </>
  );
}

export default App;
