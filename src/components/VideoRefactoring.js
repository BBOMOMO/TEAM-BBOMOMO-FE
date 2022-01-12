import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Peer from "peerjs";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.REACT_APP_API_URL;
const socket = io.connect(url);

function VideoRefact() {
  // state
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  // ref
  const myVideo = useRef(); // 나의 비디오
  const userVideo = useRef(); // peer 비디오
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      }); // 유저의 미디어 기기를 불러오고, 불러온 값을 myVideo의 src로 할당

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    }); // 화면을 구성하는데 필요한 기초 데이터
  }, []);

  const callerUser = (id) => {
    const peer = new Peer({
      config: {
        iceServers: [{ url: "stun:stun.l.google.com:19302" }],
      },
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userTocall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      config: {
        iceServers: [{ url: "stun:stun.l.google.com:19302" }],
      },
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  return <div className="App"></div>;
}

export default VideoRefact;
