import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const VideoComponent = (props) => {
  const myFace = useRef();
  const muteBtn = useRef(null);
  const cameraBtn = useRef(null);

  const [mute, setMute] = useState(true);
  const [camera, setCamera] = useState(true);

  // 비디와 오디오 상태 설정
  function handlemuteClick() {
    setMute(!mute);
    if (mute) {
      let audio = myStream.getAudioTracks();
      audio[0].enabled = false;
      console.log(audio[0].enabled);
    } else {
      let audio = myStream.getAudioTracks();
      audio[0].enabled = true;
      console.log(audio[0].enabled);
    }
  }
  // 오디오 핸들러
  function handlecameraClick() {
    setCamera(!camera);
    if (camera) {
      let video = myStream.getVideoTracks();
      video[0].enabled = false;
      console.log(video[0].enabled);
    } else {
      let video = myStream.getVideoTracks();
      video[0].enabled = true;
      console.log(video[0].enabled);
    }
  }
  // 카메라 핸들러
  let myStream;
  // 유저의 화면과 음성을 담기 위한 변수설정
  async function getMedia() {
    try {
      myStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      // 유저 화면과 음성을 변수에 담음
      myFace.current.srcObject = myStream;
      // myFace.current.classList.add("test");
      // console.log(myFace.current.classList);
      // console.log(myFace.current.srcObject);
    } catch (e) {
      console.log(e);
    }
  }

  getMedia();

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
      </div>
    </>
  );
};

export default VideoComponent;
