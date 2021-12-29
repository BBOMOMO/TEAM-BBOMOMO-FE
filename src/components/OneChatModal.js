import React from 'react';
import close from "../Images/ic_header_close.png";
import goback from "../Images/ic_header_left.png";


import Chatting from './Chatting';
import OneChatList from './OneChatList';

function OneChatModal({showModal,closeModal}) {

  const [chatStatus, setChatStatus] = React.useState(false);
  const [count, setCount] = React.useState(1);

const is_open = (e) => {
  setCount((prevCount)=> prevCount+1);

  if(count % 2 === 0){
    setChatStatus(false);
  }else{
    setChatStatus(true);
  }
}
  return (


    <div>
      { showModal ? 
        <div className="header_modal_container chat_modal" >
          {/* 메시지 헤더 */}
          {chatStatus ? 
          (<p className="header_modal_title" style={{marginLeft:"24px"}}><span className="group_modal_goback" onClick={is_open}><img src={goback} alt="뒤로가기"/></span>메시지</p>)
          :(<p className="header_modal_title">메시지</p>) }
          
          <span className="group_modal_close" onClick={closeModal}>
            <img src={close} alt="" />
          </span>
          <div className="header_modal_hr"></div>

          {/* 채팅리스트 */}
          {chatStatus ? (<Chatting className=""></Chatting>):(
         <>
          <OneChatList _onClick={is_open}/>
          <OneChatList _onClick={is_open}/>
          <OneChatList _onClick={is_open}/>
          </>
          )}

        </div>
      :null}
    </div>
  )
}

export default OneChatModal;
