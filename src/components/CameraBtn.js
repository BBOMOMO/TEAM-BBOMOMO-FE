import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import CameraOn from "../Images/cameraOn.png";
import CameraOff from "../Images/cameraOff.png";
const CameraBtn = (props) => {
  if (props.cameraOn) {
    return (
      <CameraOnOffBtn display={props.display}>
        <img src={CameraOn} alt="on" onClick={props.handleCamera} />
      </CameraOnOffBtn>
    );
  } else {
    return (
      <CameraOnOffBtn display={props.display}>
        <img src={CameraOff} alt="off" onClick={props.handleCamera} />
      </CameraOnOffBtn>
    );
  }
};

const CameraOnOffBtn = styled.div`
  width: 31%;
  height: 19%;
  background: #e5e5e5;
  border-radius: 30px;
  position: absolute;
  left: 50%;
  bottom: 25%;
  transform: translateX(-50%);
  ${(props) => (props.display ? "display: block" : "display: none")};
  img {
    width: 28px;
    height: 27px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
`;

export default CameraBtn;
