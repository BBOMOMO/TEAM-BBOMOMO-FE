import React from "react";
import GlobalStyles from "./components/GlobalStyles";

import { Route } from "react-router-dom";

import "./styles/css/signup.css";
import GroupList from "./pages/GroupList";
import Signup from "./page/Singup";

function App() {
  return (
    <>
      <GlobalStyles /> 
        <Route path="/list" exact component={GroupList}/> 
        <Route path="/" exact component={Signup} />
    </>
  );
}

export default App;
