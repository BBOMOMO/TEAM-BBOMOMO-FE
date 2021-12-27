import React from 'react';
import close from "../Images/ic_header_close.png";

function OneChatModal({showModal,closeModal}) {
  return (
    <div>
      { showModal ? 
        <div className="header_modal_container chat_modal" >
          <p className="header_modal_title">메시지</p>
          <span className="group_modal_close" onClick={closeModal}>
            <img src={close} alt="" />
          </span>
          <div className="header_modal_hr"></div>

        <div className="header_friend_container">
          <div className="header_friend_thumb"></div>
          <div className="header_friend_active"></div>
          <div className="header_friend_content">
            <p className="header_friend_name">김철수</p>
            <p className="header_friend_message">아고 기차나라~~~아고 기차나라~~~아고 기차나라~~~아고 기차나라~~~아고 기차나라~~~아고 기차나라~~~아고 기차나라~~~</p>
          </div>
        </div>

        

        </div>
      :null}
    </div>
  )
}

export default OneChatModal
