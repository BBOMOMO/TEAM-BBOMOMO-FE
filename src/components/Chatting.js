import React from 'react';
import styled from "styled-components";
import OneChatList from './OneChatList';

import send from "../Images/ic-send 1.png";

import "../styles/css/chat.css";




function Chatting() {
  const [chatMessage, setChatMessage] = React.useState('');

  const sendMessage = (e) => {
    setChatMessage(e.target.value);
  }

  return (
    <>
      <ChatContainer>
        <OneChatList>
          <div className="header_friend_joinGroup">
            참여
          </div>
        </OneChatList>
        <div className="header_modal_hr2"></div>

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
           <p className="chat_message">지금 뭐하고 있어?지금 뭐하고 있어?지금 뭐하고 있어?지금 뭐하고 있어?지금 뭐하고 있어?</p>
           <span className="chat_message_time">10:34</span>
         </div>

         <div className="chat_from_me">     
           <p className="chat_message">지금 뭐하고 있어?지금 뭐하고 있어?지금 뭐하고 있어?지금 뭐하고 있어?</p>
           <span className="chat_message_time">10:34</span>
         </div>

         <div className="chat_from_me">     
           <p className="chat_message">지금 뭐하고 있어?지금 뭐하고 있어?지금 뭐하고 있어?지금 뭐하고 있어?</p>
           <span className="chat_message_time">10:34</span>
         </div>

         <div className="chat_from_me">     
           <p className="chat_message">지금 뭐하고 있어?지금 뭐하고 있어?지금 뭐하고 있어?지금 뭐하고 있어?</p>
           <span className="chat_message_time">10:34</span>
         </div>

         <div className="chat_from_me">     
           <p className="chat_message">지금 뭐하고 있어?지금 뭐하고 있어?지금 뭐하고 있어?지금 뭐하고 있어?</p>
           <span className="chat_message_time">10:34</span>
         </div>


        </div>

       


        <div className="chat_textfield_container">
          <input type="text" className="chat_textfield" placeholder='메시지를 작성해주세요.' name="oneChat" value={chatMessage} onChange={sendMessage}/>
          <span className="chat_send_btn"><img src={send} alt="" /></span>
        </div>
      </ChatContainer>
    </>
  )
}

export default Chatting;

const ChatContainer = styled.div`

  .header_modal_hr2 {background:#E7E7E7;width:100%; height:1px;margin-bottom:20px;}
  .header_friend_container{margin-top:0}
  .header_friend_container .header_friend_joinGroup {position:absolute;right:0;border:1px solid #959595; color:#282828; font-size:10px;padding:6px 20px 5px 20px;font-weight:bold; border-radius:20px;margin-right:8px;  cursor:pointer;}
  .header_friend_container .header_friend_joinGroup:hover {background-color:#889CF2; color:#fff; }

`;
