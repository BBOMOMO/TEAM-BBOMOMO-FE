import React from 'react';
import styled from 'styled-components';
import bell from '../Images/ic-bell.png';
import chat from '../Images/ic-chat.png';
import people from '../Images/ic-people.png';
import '../styles/css/header.css';

import AlarmModal from './AlarmModal';
import OneChatModal from './OneChatModal';
import InfoModal from './InfoModal';

function Header() {

  const [showAlarmModal, setShowAlarmModal] = React.useState(false);
  const [showChatModal, setShowChatModal] = React.useState(false);
  const [showInfoModal, setShowInfoModal] = React.useState(false);


  // 주의! 다른 헤더 버튼 누르면 열려져 있던 나머지 모달창은 닫혀야 함. 그래서 open 에 나머지 modal false 값 넣어줌.
  const openAlarm = () => { setShowAlarmModal(true);setShowChatModal(false);setShowInfoModal(false); }
  const closeAlarm = () => { setShowAlarmModal(false) }

  const openChat = () => { setShowChatModal(true);setShowAlarmModal(false);setShowInfoModal(false); }
  const closeChat = () => { setShowChatModal(false) }

  const openInfo = () => {  setShowInfoModal(true);setShowAlarmModal(false);setShowChatModal(false); }
  const closeInfo = () => { setShowInfoModal(false) }



  return (
    <div>
      <HeaderContainer>
        <HeaderIcon className="header_alarm" onClick={openAlarm} />
        <HeaderIcon className="header_msg" onClick={openChat} />
        <HeaderIcon className="header_friend"onClick={openInfo} />
      </HeaderContainer>

      <AlarmModal showModal={showAlarmModal} closeModal={closeAlarm}/>
      <OneChatModal showModal={showChatModal} closeModal={closeChat}/>
      <InfoModal showModal={showInfoModal} closeModal={closeInfo}/>

    </div>
  )
}

export default Header;


const HeaderContainer = styled.div`
flex:1;
display: flex;
align-items: center;
justify-content: flex-end;
border:1px solid #bbb;
height:80px;
padding:0 100px;
box-sizing: border-box;
position:fixed;
width:100%;
background: #fff;
z-index:998;
`;

const HeaderIcon = styled.div`
width:57px;
height:57px;
border-radius:11px;
margin-left:50px;

 &.header_alarm{
   width:57px;
   height:57px;
   background-image:url(${bell});
   background-size:60%;
   background-repeat:no-repeat;
   background-position:50% 50%;

 }

 &.header_msg{
   width:57px;
   height:57px;
   background-image:url(${chat});
   background-size:60%;
   background-repeat:no-repeat;
   background-position:50% 50%;

 }

 &.header_friend{
   width:57px;
   height:57px;
   background-image:url(${people});
   background-size:60%;
   background-repeat:no-repeat;
   background-position:50% 50%;

 }
 :hover {
   background-color:#f4f4f4;
 }
 
`;