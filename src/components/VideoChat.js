import React, { useRef, useState, useEffect } from "react";
import GlobalStyles from "./GlobalStyles";
import io from "socket.io-client";

const VideoChat = () => {
  const socket = io();
  // Ref
  const myFaceRef = useRef();
  const myFace = myFaceRef.current;
  const muteBtnRef = useRef();
  const muteBtn = muteBtnRef.current;
  const muteIconRef = useRef();
  const muteIcon = muteIconRef.current;
  const unMuteIconRef = useRef();
  const unMuteIcon = unMuteIconRef.current;
  const cameraBtnRef = useRef();
  const cameraBtn = cameraBtnRef.current;
  const cameraIconRef = useRef();
  const cameraIcon = cameraIconRef.current;
  const unCameraIconRef = useRef();
  const unCameraIcon = unCameraIconRef.current;
  const camerasSelectRef = useRef();
  const camerasSelect = camerasSelectRef.current;
  const callRef = useRef();
  const call = callRef.current;
  const welcomeRef = useRef();
  const welcome = welcomeRef.current;
  const optionRef = useRef();
  const option = optionRef.current;
  option.value = "안녕하세요";
  // console.log(option);

  let myStream;
  let muted = true;
  let cameraOff = false;
  let roomName = "";
  let nickname = "";

  const [people, setPeople] = useState(1);
  const [mute, setMute] = useState(false);
  const [camera, setCamera] = useState(false);

  async function getCameras() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter((device) => device.kind === "videoinput");
      const currentCamera = myStream.getVideoTracks();
      cameras.forEach((camera) => {
        option.value = camera.deviceId;
        option.innerText = camera.label;

        if (currentCamera.label == camera.label) {
          option.selected = true;
        }

        camerasSelect.appendChild(option);
      });
    } catch (error) {
      console.log(error);
    }
  }
  getCameras();
  return (
    <div id="main">
      <div id="welcome" ref={welcomeRef}>
        <form action="">
          <input type="text" />
          <input type="text" />
          <button></button>
        </form>
      </div>
      <div id="call" ref={callRef}>
        <div id="streamBox">
          <div id="streams">
            <div id="myStream" className="people1">
              <video
                id="myFace"
                autoPlay
                playsInline
                width="400"
                height="400"
                ref={myFaceRef}
              ></video>
              <h3 id="userNickname"></h3>
            </div>
          </div>
          <div id="controlers">
            <div id="controlers__column">
              <select id="cameras" ref={camerasSelectRef}></select>
            </div>
            <div id="controlers__column">
              <div id="buttons">
                <button id="mute" ref={muteBtnRef}>
                  <i className="unMuteIcon" ref={muteIconRef}></i>
                  <i className="muteIcon" ref={unMuteIconRef}></i>
                </button>
                <button id="camera" ref={cameraBtnRef}>
                  <i className="cameraIcon" ref={cameraIconRef}></i>
                  <i className="unCameraIcon" ref={unCameraIconRef}></i>
                </button>
              </div>
            </div>
            <div id="controlers__column">
              <button id="leave">leave</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoChat;
