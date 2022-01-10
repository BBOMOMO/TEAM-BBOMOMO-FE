import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const Video = (props) => {
  const socket = io();
  const myFaceRef = useRef();
  console.log(myFaceRef);
  // const myFace = myFaceRef.current;
  const muteBtnRef = useRef();
  // const muteBtn = muteBtnRef.current;
  const muteIconRef = useRef();
  // const muteIcon = muteIconRef.current;
  const unMuteIconRef = useRef();
  // const unMuteIcon = unMuteIconRef.current;
  const cameraBtnRef = useRef();
  // const cameraBtn = cameraBtnRef.current;
  const cameraIconRef = useRef();
  // const cameraIcon = cameraIconRef.current;
  const unCameraIconRef = useRef();
  // const unCameraIcon = unCameraIconRef.current;
  const camerasSelectRef = useRef();
  // const camerasSelect = camerasSelectRef.current;

  const call = document.querySelector("#call");
  const welcome = document.querySelector("#welcome");

  const HIDDEN_CN = "hidden";

  let myStream;
  let muted = true;
  console.log(unMuteIconRef);
  unMuteIconRef.current.classList.add(HIDDEN_CN);
  let cameraOff = false;
  unCameraIconRef.current.classList.add(HIDDEN_CN);
  let roomName = "";
  let nickname = "";
  let peopleInRoom = 1;

  let pcObj = {
    // remoteSocketId: pc
  };

  let peerConnectionObjArr = [];

  async function getCameras() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter((device) => device.kind === "videoinput");
      const currentCamera = myStream.getVideoTracks();
      cameras.forEach((camera) => {
        const option = document.createElement("option");
        option.value = camera.deviceId;
        option.innerText = camera.label;

        if (currentCamera.label == camera.label) {
          option.selected = true;
        }

        camerasSelectRef.current.appendChild(option);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function getMedia(deviceId) {
    const initialConstraints = {
      audio: true,
      video: { facingMode: "user" },
    };
    const cameraConstraints = {
      audio: true,
      video: { deviceId: { exact: deviceId } },
    };

    try {
      myStream = await navigator.mediaDevices.getUserMedia(
        deviceId ? cameraConstraints : initialConstraints
      );

      // stream을 mute하는 것이 아니라 HTML video element를 mute한다.
      myFaceRef.current.srcObject = myStream;
      myFaceRef.current.muted = true;

      if (!deviceId) {
        // mute default
        myStream //
          .getAudioTracks()
          .forEach((track) => (track.enabled = false));

        await getCameras();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleMuteClick() {
    myStream //
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    if (muted) {
      unMuteIconRef.current.classList.remove(HIDDEN_CN);
      muteIconRef.current.classList.add(HIDDEN_CN);
      muted = false;
    } else {
      muteIconRef.current.classList.remove(HIDDEN_CN);
      unMuteIconRef.current.classList.add(HIDDEN_CN);
      muted = true;
    }
  }

  function handleCameraClick() {
    myStream //
      .getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    if (cameraOff) {
      cameraIconRef.current.classList.remove(HIDDEN_CN);
      unCameraIconRef.current.classList.add(HIDDEN_CN);
      cameraOff = false;
    } else {
      unCameraIconRef.current.classList.remove(HIDDEN_CN);
      cameraIconRef.current.classList.add(HIDDEN_CN);
      cameraOff = true;
    }
  }

  async function handleCameraChange() {
    try {
      await getMedia(camerasSelectRef.current.value);
      if (peerConnectionObjArr.length > 0) {
        const newVideoTrack = myStream.getVideoTracks()[0];
        peerConnectionObjArr.forEach((peerConnectionObj) => {
          const peerConnection = peerConnectionObj.connection;
          const peerVideoSender = peerConnection
            .getSenders()
            .find((sender) => sender.track.kind == "video");
          peerVideoSender.replaceTrack(newVideoTrack);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  muteBtnRef.current.addEventListener("click", handleMuteClick);
  cameraBtnRef.current.addEventListener("click", handleCameraClick);
  camerasSelectRef.current.addEventListener("input", handleCameraChange);

  /////////////////////////////////// prototype
  // Screen Sharing

  let captureStream = null;

  async function startCapture() {
    try {
      captureStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      const screenVideo = document.querySelector("#screen");
      screenVideo.srcObject = captureStream;
    } catch (error) {
      console.error(error);
    }
  }

  // Welcome Form (choose room)

  call.classList.add(HIDDEN_CN);
  // welcome.hidden = true;

  const welcomeForm = welcome.querySelector("form");

  async function initCall() {
    welcome.hidden = true;
    call.classList.remove(HIDDEN_CN);
    await getMedia();
  }

  async function handleWelcomeSubmit(event) {
    event.preventDefault();

    if (socket.disconnected) {
      socket.connect();
    }

    const welcomeRoomName = welcomeForm.querySelector("#roomName");
    const welcomeNickname = welcomeForm.querySelector("#nickname");
    const nicknameContainer = document.querySelector("#userNickname");
    roomName = welcomeRoomName.value;
    welcomeRoomName.value = "";
    nickname = welcomeNickname.value;
    welcomeNickname.value = "";
    nicknameContainer.innerText = nickname;
    socket.emit("join_room", roomName, nickname);
  }

  welcomeForm.addEventListener("submit", handleWelcomeSubmit);

  // Chat Form

  const chatForm = document.querySelector("#chatForm");
  const chatBox = document.querySelector("#chatBox");

  const MYCHAT_CN = "myChat";
  const NOTICE_CN = "noticeChat";

  chatForm.addEventListener("submit", handleChatSubmit);

  function handleChatSubmit(event) {
    event.preventDefault();
    const chatInput = chatForm.querySelector("input");
    const message = chatInput.value;
    chatInput.value = "";
    socket.emit("chat", `${nickname}: ${message}`, roomName);
    writeChat(`You: ${message}`, MYCHAT_CN);
  }

  function writeChat(message, className = null) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = message;
    li.appendChild(span);
    li.classList.add(className);
    chatBox.prepend(li);
  }

  // Leave Room

  const leaveBtn = document.querySelector("#leave");

  function leaveRoom() {
    socket.disconnect();

    call.classList.add(HIDDEN_CN);
    welcome.hidden = false;

    peerConnectionObjArr = [];
    peopleInRoom = 1;
    nickname = "";

    myStream.getTracks().forEach((track) => track.stop());
    const nicknameContainer = document.querySelector("#userNickname");
    nicknameContainer.innerText = "";

    myFaceRef.current.srcObject = null;
    clearAllVideos();
    clearAllChat();
  }

  function removeVideo(leavedSocketId) {
    const streams = document.querySelector("#streams");
    const streamArr = streams.querySelectorAll("div");
    streamArr.forEach((streamElement) => {
      if (streamElement.id === leavedSocketId) {
        streams.removeChild(streamElement);
      }
    });
  }

  function clearAllVideos() {
    const streams = document.querySelector("#streams");
    const streamArr = streams.querySelectorAll("div");
    streamArr.forEach((streamElement) => {
      if (streamElement.id != "myStream") {
        streams.removeChild(streamElement);
      }
    });
  }

  function clearAllChat() {
    const chatArr = chatBox.querySelectorAll("li");
    chatArr.forEach((chat) => chatBox.removeChild(chat));
  }

  leaveBtn.addEventListener("click", leaveRoom);

  // Modal code

  const modal = document.querySelector(".modal");
  const modalText = modal.querySelector(".modal__text");
  const modalBtn = modal.querySelector(".modal__btn");

  function paintModal(text) {
    modalText.innerText = text;
    modal.classList.remove(HIDDEN_CN);

    modal.addEventListener("click", removeModal);
    modalBtn.addEventListener("click", removeModal);
    document.addEventListener("keydown", handleKeydown);
  }

  function removeModal() {
    modal.classList.add(HIDDEN_CN);
    modalText.innerText = "";
  }

  function handleKeydown(event) {
    if (event.code === "Escape" || event.code === "Enter") {
      removeModal();
    }
  }

  // Socket code

  socket.on("reject_join", () => {
    // Paint modal
    paintModal("Sorry, The room is already full.");

    // Erase names
    const nicknameContainer = document.querySelector("#userNickname");
    nicknameContainer.innerText = "";
    roomName = "";
    nickname = "";
  });

  socket.on("accept_join", async (userObjArr) => {
    await initCall();

    const length = userObjArr.length;
    if (length === 1) {
      return;
    }

    writeChat("Notice!", NOTICE_CN);
    for (let i = 0; i < length - 1; ++i) {
      try {
        const newPC = createConnection(
          userObjArr[i].socketId,
          userObjArr[i].nickname
        );
        const offer = await newPC.createOffer();
        await newPC.setLocalDescription(offer);
        socket.emit("offer", offer, userObjArr[i].socketId, nickname);
        writeChat(`__${userObjArr[i].nickname}__`, NOTICE_CN);
      } catch (err) {
        console.error(err);
      }
    }
    writeChat("is in the room.", NOTICE_CN);
  });

  socket.on("offer", async (offer, remoteSocketId, remoteNickname) => {
    try {
      const newPC = createConnection(remoteSocketId, remoteNickname);
      await newPC.setRemoteDescription(offer);
      const answer = await newPC.createAnswer();
      await newPC.setLocalDescription(answer);
      socket.emit("answer", answer, remoteSocketId);
      writeChat(`notice! __${remoteNickname}__ joined the room`, NOTICE_CN);
    } catch (err) {
      console.error(err);
    }
  });

  socket.on("answer", async (answer, remoteSocketId) => {
    await pcObj[remoteSocketId].setRemoteDescription(answer);
  });

  socket.on("ice", async (ice, remoteSocketId) => {
    await pcObj[remoteSocketId].addIceCandidate(ice);
  });

  socket.on("chat", (message) => {
    writeChat(message);
  });

  socket.on("leave_room", (leavedSocketId, nickname) => {
    removeVideo(leavedSocketId);
    writeChat(`notice! ${nickname} leaved the room.`, NOTICE_CN);
    --peopleInRoom;
    sortStreams();
  });

  // RTC code

  function createConnection(remoteSocketId, remoteNickname) {
    const myPeerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
            "stun:stun3.l.google.com:19302",
            "stun:stun4.l.google.com:19302",
          ],
        },
      ],
    });
    myPeerConnection.addEventListener("icecandidate", (event) => {
      handleIce(event, remoteSocketId);
    });
    myPeerConnection.addEventListener("addstream", (event) => {
      handleAddStream(event, remoteSocketId, remoteNickname);
    });
    // myPeerConnection.addEventListener(
    //   "iceconnectionstatechange",
    //   handleConnectionStateChange
    // );
    myStream //
      .getTracks()
      .forEach((track) => myPeerConnection.addTrack(track, myStream));

    pcObj[remoteSocketId] = myPeerConnection;

    ++peopleInRoom;
    sortStreams();
    return myPeerConnection;
  }

  function handleIce(event, remoteSocketId) {
    if (event.candidate) {
      socket.emit("ice", event.candidate, remoteSocketId);
    }
  }

  function handleAddStream(event, remoteSocketId, remoteNickname) {
    const peerStream = event.stream;
    paintPeerFace(peerStream, remoteSocketId, remoteNickname);
  }

  function paintPeerFace(peerStream, id, remoteNickname) {
    const streams = document.querySelector("#streams");
    const div = document.createElement("div");
    div.id = id;
    const video = document.createElement("video");
    video.autoplay = true;
    video.playsInline = true;
    video.width = "400";
    video.height = "400";
    video.srcObject = peerStream;
    const nicknameContainer = document.createElement("h3");
    nicknameContainer.id = "userNickname";
    nicknameContainer.innerText = remoteNickname;

    div.appendChild(video);
    div.appendChild(nicknameContainer);
    streams.appendChild(div);
    sortStreams();
  }

  function sortStreams() {
    const streams = document.querySelector("#streams");
    const streamArr = streams.querySelectorAll("div");
    streamArr.forEach((stream) => (stream.className = `people${peopleInRoom}`));
  }

  return (
    <>
      <div id="welcome">
        <form>
          <input type="text" id="roomName" />
          <input type="text" id="nickName" />
          <button>Enter Room</button>
        </form>
      </div>
      {/* welcome */}
      <div id="call" className="call">
        <div id="streamBox">
          <div id="streams">
            <div id="myStream" className="people1">
              <video
                id="myFace"
                autoPlay
                playsInline
                width={"400"}
                height={"400"}
                ref={myFaceRef}
              ></video>
              <h3 id="userNickname"></h3>
            </div>
          </div>
          <div id="controlers">
            <div id="controlers__column">
              <select name="" id="cameras" ref={camerasSelectRef}></select>
            </div>
            <div id="controlers__column">
              <div id="buttons">
                <button id="mute" ref={muteBtnRef}>
                  <i
                    className="fas fa-microphone fa-2x unMuteIcon"
                    ref={unMuteIconRef}
                  ></i>
                  <i
                    className="fas fa-microphone-slash fa-2x muteIcon"
                    ref={muteIconRef}
                  ></i>
                </button>
                <button id="camera" ref={cameraBtnRef}>
                  <i
                    className="fas fa-video fa-2x cameraIcon"
                    ref={cameraIconRef}
                  ></i>
                  <i
                    className="fas fa-video-slash fa-2x unCameraIcon"
                    ref={unCameraIconRef}
                  ></i>
                </button>
              </div>
            </div>
            <div id="controlers__column">
              <button id="leave">leave</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Video;
