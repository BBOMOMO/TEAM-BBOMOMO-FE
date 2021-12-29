import React from 'react';

function OneChatList(props) {
  const {_onClick, children} = props;

  return (
    <>
    <div className="header_friend_container" onClick={_onClick}>
      <div className="header_friend_thumb"></div>
      <div className="header_friend_active"></div>
      <div className="header_friend_content">
        <p className="header_friend_name">김철수</p>
        <p className="header_friend_message">상태메시지 내용이 들어가는 부분</p>
      </div>
      {children}
    </div>
      
    </>
  )
}

export default OneChatList;
