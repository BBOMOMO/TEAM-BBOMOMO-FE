import React from 'react';
import close from "../Images/ic_header_close.png";
import noAlarm from "../Images/noAlarm.png";


function AlarmModal({showModal,closeModal}) {
  return (
    <div>
      
      { showModal ? 
        <div className="header_modal_container alarm_modal">
          <p className="header_modal_title">알림</p>
          <span className="group_modal_close" onClick={closeModal}>
            <img src={close} alt="" />
          </span>
          <div className="header_modal_hr"></div>

          <div className="header_modal_nothing">
            <img src={noAlarm} alt="알람없음" />
          </div>

          {/* <div className="header_friend_container">
            <div className="header_friend_thumb"></div>
            <div className="header_friend_content">
              <span className="header_friend_alarmmessage">김철수님이 친구 신청을 요청하였습니다.</span>
              <span className="header_friend_alartime">2분 전</span>
              <div className="header_friend_allowBtnWrap">
                <div className="btn">수락</div>
                <div className="btn">거절</div>
              </div>
            </div>  
          </div> */}

          

        </div>
      :null}
    </div>
  )
}

export default AlarmModal;
