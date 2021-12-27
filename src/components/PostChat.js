// import React, { useState, useEffect, useRef } from "react";
// import io from "socket.io-client";
// import TextField from "@material-ui/core/TextField";

// const socket = io.connect("http://13.209.4.79:3000");

// function App() {
//   const [state, setState] = useState({ message: "", name: "234" });
//   const [chat, setChat] = useState([]);

//   //   const socketRef = useRef();

//   //   useEffect(() => {
//   //     socketRef.current = io.connect("http://localhost:3000");
//   //     socketRef.current.on("message", ({ name, message }) => {
//   //       setChat([...chat, { name, message }]);
//   //     });
//   //     return () => socketRef.current.disconnect();
//   //   }, [chat]);
//   useEffect(() => {
//     socket.on("message", ({ name, message }) => {
//       setChat([...chat, { name, message }]);
//       //   console.log("연결 sdfsdfsdf됐나요?");
//     });

//     // socket.emit("message", "서현ㅇㅇㄴㄹㄴㅇㄹㄴㅇㄹㅇㄴㄹ?");
//   }, [chat]);

//   useEffect(() => {
//     socket.on("message", (msg) => {
//       console.log(msg);
//     });
//   }, []);

//   const useRef = (e) => {
//     setState({ ...state, [e.target.name]: e.target.value });
//     console.log(state, "2134");
//     // setChat({ ...chat, [e.target.name]: e.target.value });
//   };

//   const onMessageSubmit = (e) => {
//     e.preventDefault();
//     const { name, message } = state;
//     socket.emit("message", { name, message });
//     setState({ message: "", name });
//   };

//   const renderChat = () => {
//     return (
//       chat &&
//       chat.map(({ name, message }, index) => (
//         <div key={index}>
//           <h3>
//             {name}:<span>{message}</span>
//           </h3>
//         </div>
//       ))
//     );
//   };

//   return (
//     <div className="card">
//       <form onSubmit={onMessageSubmit}>
//         <h1>Message</h1>
//         <div className="name-field">
//           <TextField
//             name="name"
//             onChange={(e) => onTextChange(e)}
//             value={state.name}
//             label="Name"
//           />
//         </div>
//         <div>
//           <TextField
//             name="message"
//             onChange={(e) => onTextChange(e)}
//             value={state.message}
//             id="outlined-multiline-static"
//             variant="outlined"
//             label="Message"
//           />
//         </div>
//         <button>Send Message</button>
//       </form>
//       <div className="render-chat">
//         <h1>Chat log</h1>
//         {renderChat()}
//       </div>
//     </div>
//   );
// }

// export default App;

import TextField from "@material-ui/core/TextField";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

function PostChat() {
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("http://13.209.4.79:3000");
    socketRef.current.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
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
