import TextField from "@material-ui/core/TextField";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { history } from "../redux/configureStore";
import Peer from "peerjs";
import dotenv from "dotenv";
import { actionCreators as groupAction } from "../redux/modules/group";
dotenv.config();

function PostChat() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const url = process.env.REACT_APP_API_URL;
  const params = useParams();
  const roomId = params.roomId;
  // console.log(roomNum);
  let userId = localStorage.getItem("nick");
  const [state, setState] = useState({ message: "", name: userId });
  const [chat, setChat] = useState([]);
  const socketRef = useRef();
  const inputRef = useRef();
  // let round = 2;
  // totalRound는 EnterRoom 들어올 떄 http로 받을 수 있음.
  // let currentRound = 1;
  // let userId = 1;

  useEffect(() => {
    //console.log(user);
    //console.log(inputRef);
    socketRef.current = io.connect(url);
    socketRef.current.emit("join-chatRoom", roomId, userId);
    socketRef.current.on("message", (name, message, roomId) => {
      //console.log(name, message, roomId);
      setChat([...chat, { name, message }]);
    });
    socketRef.current.on("welcome", (roomId) => {
      //console.log("안녕하세요");
      // console.log(roomId);
    });
    socketRef.current.on("hi", (msg) => {
      // console.log(msg);
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
    socketRef.current.emit("message", userId, message, roomId);
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
