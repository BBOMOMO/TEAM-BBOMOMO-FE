import TextField from "@material-ui/core/TextField";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { history } from "../redux/configureStore";
import Peer from "peerjs";

function PostChat() {
  const user = useSelector((state) => state.user.userInfo);
  console.log(user);
  const params = useParams();
  const roomId = params.roomId;
  // console.log(roomNum);
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);
  const socketRef = useRef();
  const inputRef = useRef();
  console.log(inputRef);
  // let round = 2;
  // totalRound는 EnterRoom 들어올 떄 http로 받을 수 있음.
  // let currentRound = 1;
  let userId = localStorage.getItem("id");
  // let userId = 1;
  let userNick = localStorage.getItem("nick");
  useEffect(() => {
    socketRef.current = io.connect("http://13.209.3.61");
    socketRef.current.emit("join-room", roomId, userId, userNick);
    socketRef.current.on("message", ({ name, message, roomId }) => {
      setChat([...chat, { name, message }]);
    });
    socketRef.current.on("welcome", (roomId) => {
      console.log("안녕하세요");
      console.log(roomId);
    });
    socketRef.current.on("hi", (msg) => {
      console.log(msg);
    });

    // 쉬는 시간 종료(중간에 들어온 사람도 같은 시간 동기화 가능), 공부시간 종료 타이머,
    let gapTimeFloor;

    socketRef.current.on("restTime", (currentRound, totalRound, time) => {
      inputRef.current.classList.remove("chat_disabled");
      console.log(currentRound, totalRound, time);
      const endTime = time;
      const nowTime = new Date().getTime();
      const gapTime = endTime - nowTime;
      console.log(gapTime);
      gapTimeFloor = Math.floor(gapTime / 1000);
      let MinTime = Math.floor(gapTime / (1000 * 60));
      let secTime = Math.floor((gapTime % (1000 * 60)) / 1000);
      // console.log(MinTime, secTime, gapTimeFloor);
      let timer = () => {
        gapTimeFloor = gapTimeFloor - 1;
        console.log(gapTimeFloor);
        let min = Math.floor(gapTimeFloor / 60);
        let sec = gapTimeFloor % 60;
        console.log(`남은 시간은 ${min}분 ${sec}초 입니다.`, "쉬는시간");
        if (min === 0 && sec === 0) {
          console.log(currentRound, totalRound);
          console.log("쉬는시간 종료");
          currentRound = currentRound + 1;
          console.log(currentRound, "현재 라운드");
          socketRef.current.emit("endRest", roomId, currentRound);
          clearInterval(restinterval);
        }
      };
      const restinterval = setInterval(timer, 1000);
    });

    socketRef.current.on("studyTime", (currentRound, totalRound, time) => {
      inputRef.current.classList.add("chat_disabled");
      console.log(time);
      const endTime = time;
      const nowTime = new Date().getTime();
      const gapTime = endTime - nowTime;
      gapTimeFloor = Math.floor(gapTime / 1000);
      let MinTime = Math.floor(gapTime / (1000 * 60));
      let secTime = Math.floor((gapTime % (1000 * 60)) / 1000);
      // console.log(MinTime, secTime, gapTimeFloor);
      let timer = () => {
        gapTimeFloor = gapTimeFloor - 1;
        console.log(gapTimeFloor);
        let min = Math.floor(gapTimeFloor / 60);
        let sec = gapTimeFloor % 60;
        console.log(`남은 시간은 ${min}분 ${sec}초 입니다.`, "수업시간");
        if (min === 0 && sec === 0) {
          console.log(currentRound, totalRound, "현재 라운드와 토탈 라운드");
          console.log("수업시간 종료");
          if (currentRound !== totalRound) {
            socketRef.current.emit("endStudy", roomId, userId, userNick);
            console.log("endStudy 발생");
          }
          if (currentRound === totalRound) {
            socketRef.current.emit("totalEnd", roomId, userId, userNick);
          }
          clearInterval(studyinterval);
        }
      };
      const studyinterval = setInterval(timer, 1000);
    });

    socketRef.current.on("totalEnd", (time) => {
      const endTime = time;
      const nowTime = new Date().getTime();
      const gapTime = endTime - nowTime;
      gapTimeFloor = Math.floor(gapTime / 1000);
      let MinTime = Math.floor(gapTime / (1000 * 60));
      let secTime = Math.floor((gapTime % (1000 * 60)) / 1000);
      // console.log(MinTime, secTime, gapTimeFloor);
      let timer = () => {
        gapTimeFloor = gapTimeFloor - 1;
        console.log(gapTimeFloor);
        let min = Math.floor(gapTimeFloor / 60);
        let sec = gapTimeFloor % 60;
        console.log(`남은 시간은 ${min}분 ${sec}초 입니다.`, "수고하셨습니다.");
        if (min === 0 && sec === 0) {
          clearInterval(goodByeinterval);
          // socketRef.current.emit("removeRoom", roomId);
          history.push("/");
        }
      };
      const goodByeinterval = setInterval(timer, 1000);
    });
    // socketRef.current.emit("disconnect", roomId);
    // 쉬는 시간 종료
    return () => socketRef.current.disconnect();
  }, [chat]);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    const { name, message } = state;
    socketRef.current.emit("message", { name, message, roomId });
    e.preventDefault();
    setState({ message: "", name });
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ));
  };

  return (
    <div className="card" ref={inputRef}>
      <form onSubmit={onMessageSubmit}>
        <h1>Messenger</h1>
        <div className="name-field">
          <TextField
            name="name"
            onChange={(e) => onTextChange(e)}
            value={state.name}
            label="Name"
          />
        </div>
        <div>
          <TextField
            name="message"
            onChange={(e) => onTextChange(e)}
            value={state.message}
            id="outlined-multiline-static"
            variant="outlined"
            label="Message"
          />
        </div>
        <button>Send Message</button>
      </form>
      <div className="render-chat">
        <h1>Chat Log</h1>
        {renderChat()}
      </div>
    </div>
  );
}

export default PostChat;
