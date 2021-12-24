import React from "react";
import GlobalStyles from "./components/GlobalStyles";
import { Route } from "react-router-dom";

import GroupList from "./pages/GroupList";

function App() {
  return (
    <>
      <GlobalStyles /> 
        <Route path="/list" exact component={GroupList}/> 
    </>
  );
}

export default App;
