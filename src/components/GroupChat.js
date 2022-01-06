import React from "react";
import styled from "styled-components";
import OneChatList from "./OneChatList";

import send from "../Images/ic-send 1.png";

import "../styles/css/chat.css";

function GroupChat() {
  const [chatMessage, setChatMessage] = React.useState("");

  const sendMessage = (e) => {
    setChatMessage(e.target.value);
  };

  return (
    <>
      <ChatContainer>
        <p className="header_modal_title">그룹채팅</p>
        <div className="header_modal_hr"></div>

        <div className="group_chat_container">
          <div className="chat_render_oneChat">
            <div className="chat_from_friend">
              <p className="chat_message">지금 뭐 공부하고있어?</p>
              <span className="chat_message_time">10:34</span>
            </div>

            <div className="chat_from_me">
              <p className="chat_message">호에에에에호에에에엥</p>
              <span className="chat_message_time">10:34</span>
            </div>

            <div className="chat_from_friend">
              <p className="chat_message">
                지금 뭐하고 있어?지금 뭐하고 있어?지금 뭐하고 있어?지금 뭐하고
                있어?지금 뭐하고 있어?
              </p>
              <span className="chat_message_time">10:34</span>
            </div>

            <div className="chat_from_me">
              <p className="chat_message">
                지금 뭐하고 있어?지금 뭐하고 있어?지금 뭐하고 있어?지금 뭐하고
                있어?
              </p>
              <span className="chat_message_time">10:34</span>
            </div>
            <div className="chat_from_me">
              <p className="chat_message">
                지금 뭐하고 있어?지금 뭐하고 있어?지금 뭐하고 있어?지금 뭐하고
                있어?
              </p>
              <span className="chat_message_time">10:34</span>
            </div>
            <div className="chat_from_me">
              <p className="chat_message">
                지금 뭐하고 있어?지금 뭐하고 있어?지금 뭐하고 있어?지금 뭐하고
                있어?
              </p>
              <span className="chat_message_time">10:34</span>
            </div>
            <div className="chat_from_friend">
              <p className="chat_message">
                지금 뭐하고 있어?지금 뭐하고 있어?지금 뭐하고 있어?지금 뭐하고
                있어?지금 뭐하고 있어?
              </p>
              <span className="chat_message_time">10:34</span>
            </div>
            <div className="chat_from_friend">
              <p className="chat_message">
                지금 뭐하고 있어?지금 뭐하고 있어?지금 뭐하고 있어?지금 뭐하고
                있어?지금 뭐하고 있어?
              </p>
              <span className="chat_message_time">10:34</span>
            </div>
            <div className="chat_from_friend">
              <p className="chat_message">
                지금 뭐하고 있어?지금 뭐하고 있어?지금 뭐하고 있어?지금 뭐하고
                있어?지금 뭐하고 있어?
              </p>
              <span className="chat_message_time">10:34</span>
            </div>
          </div>
          <div className="chat_textfield_container">
            <input
              type="text"
              className="chat_textfield"
              placeholder="메시지를 작성해주세요."
              name="oneChat"
              value={chatMessage}
              onChange={sendMessage}
            />
            <span className="chat_send_btn">
              <img src={send} alt="" />
            </span>
          </div>
        </div>
      </ChatContainer>
    </>
  );
}

export default GroupChat;

const ChatContainer = styled.div`
  position: relative;
  height: 85vh;
  margin: 0 80px;
  box-shadow: 0px 4px 35px 4px rgba(162, 162, 162, 0.25);
  border-radius: 16px;
  box-sizing: border-box;
  width: 428px;

  .group_chat_container {
    padding: 18px;
  }
  .chat_render_oneChat {
    min-height: auto;
    height: 600px;
    overflow: auto;
  }
  .chat_textfield_container {
    position: absolute;
    bottom: 30px;
    width: 380px;
    left: 50%;
    transform: translateX(-50%);
  }
  .header_modal_title {
    margin: 30px 18px 25px;
  }
`;
