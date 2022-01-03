import TextField from "@material-ui/core/TextField";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

function PostChat() {
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);

  const socketRef = useRef();

  function getTime() {}

  useEffect(() => {
    socketRef.current = io.connect("http://13.209.3.61");
    socketRef.current.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
    socketRef.current.on("hi", (msg) => {
      console.log(msg);
    });
    // 쉬는 시간 종료(중간에 들어온 사람도 같은 시간 동기화 가능), 공부시간 종료 타이머,
    let gapTimeFloor;
    socketRef.current.on("time", (time) => {
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
        console.log(`남은 시간은 ${min}분 ${sec}초 입니다.`);
        if (min === 0 && sec === 0) {
          window.alert("공부해! 새끼들아!");
        }
      };
      setInterval(timer, 1000);
    });
    return () => socketRef.current.disconnect();
  }, [chat]);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    const { name, message } = state;
    socketRef.current.emit("message", { name, message });
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
    <div className="card">
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
