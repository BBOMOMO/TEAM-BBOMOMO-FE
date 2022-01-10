import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import io from "socket.io-client";

const VideoComponent = (props) => {
  const myFace = useRef();
  const muteBtn = useRef(null);
  const cameraBtn = useRef(null);
  const camerasSelect = useRef(null);

  const [mute, setMute] = useState(true);
  const [camera, setCamera] = useState(true);

  let cameraArray = [];
  // 비디와 오디오 상태 설정
  function handlemuteClick() {
    setMute((prev) => !prev);
    if (mute) {
      let audio = myStream.getTracks();
      audio[0].enabled = false;
      console.log(audio[0].enabled);
    } else {
      let audio = myStream.getTracks();
      audio[0].enabled = true;
      console.log(audio[0].enabled);
    }
  }
  // 오디오 핸들러
  function handlecameraClick() {
    setCamera((prev) => !prev);
    if (camera) {
      let video = myStream.getTracks();
      video[0].enabled = false;
      console.log(video[0].enabled);
    } else {
      let video = myStream.getTracks();
      video[0].enabled = true;
      console.log(video[0].enabled);
    }
  }
  // 카메라 핸들러
  let myStream;
  // 유저의 화면과 음성을 담기 위한 변수설정

  async function getCameras() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter((device) => device.kind === "videoinput");
      console.log(cameras);
      cameraArray.push(...cameras);
      // cameraArray.forEach((camera) => {
      //   let option = React.createElement("option", { className: "option" });
      //   option.value = camera.deviceId;
      //   option.innerText = camera.label;
      //   camerasSelect.appendChild(option);
      // });
    } catch (e) {
      console.log(e);
    }
  }

  async function getMedia() {
    try {
      myStream = await navigator.mediaDevices.getUserMedia({
        audio: mute,
        video: camera,
      });
      // 유저 화면과 음성을 변수에 담음
      myFace.current.srcObject = myStream;
      // myFace.current.classList.add("test");
      // console.log(myFace.current.classList);
      // console.log(myFace.current.srcObject);
      await getCameras();
    } catch (e) {
      console.log(e);
    }
  }
  getMedia();
  console.log(cameraArray);
  return (
    <>
      <div id="myStream">
        <video
          id="myFace"
          autoPlay
          playsInline
          width={"400"}
          height={"400"}
          ref={myFace}
          style={{ backgroundColor: "#000" }}
        ></video>
        {mute ? (
          <button id="mute" ref={muteBtn} onClick={handlemuteClick}>
            Mute
          </button>
        ) : (
          <button id="mute" ref={muteBtn} onClick={handlemuteClick}>
            unMute
          </button>
        )}
        {camera ? (
          <button id="camera" ref={cameraBtn} onClick={handlecameraClick}>
            Turn camera off
          </button>
        ) : (
          <button id="camera" ref={cameraBtn} onClick={handlecameraClick}>
            Turn camera on
          </button>
        )}
        <select id="cameras" ref={camerasSelect}>
          {cameraArray.map((el, idx) => {
            console.log(el, idx);
            return <Options value={el.deviceId}>{el.label}</Options>;
          })}
          {/* <option value="카메라">카메라</option> */}
        </select>
      </div>
    </>
  );
};

const Options = styled.option``;

export default VideoComponent;
