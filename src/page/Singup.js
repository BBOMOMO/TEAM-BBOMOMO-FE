import React from "react";
import styled from "styled-components";
import SingupCont from "../components/SignupCont";
import logo from "../Images/bbomomologo.png";

const Signup = (props) => {
  return (
    <div className="signup">
      <div className="signup_img_area">
        <img className="signup_img_area_logo" src ={logo} />
      </div>
      <SingupCont />
    </div>
  );
};

export default Signup;
