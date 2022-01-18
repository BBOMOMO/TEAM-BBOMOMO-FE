import React from "react";
import styled from "styled-components";
import bell from "../Images/ic-bell.png";
import chat from "../Images/ic-chat.png";
import people from "../Images/ic-people.png";
import bellnone from "../Images/ic-bell-none.png";
import chatnone from "../Images/ic-chat-none.png";
import peoplenone from "../Images/ic-people-none.png";
import logo from "../Images/bbomomologo.png";
import "../styles/css/header.css";

import AlarmModal from "./AlarmModal";
import OneChatModal from "./OneChatModal";
import InfoModal from "./InfoModal";

import { useSelector } from "react-redux";
import { history } from "../redux/configureStore";

function Header(props) {
  const {is_studyroom} = props;

  const [showAlarmModal, setShowAlarmModal] = React.useState(false);
  const [showChatModal, setShowChatModal] = React.useState(false);
  const [showInfoModal, setShowInfoModal] = React.useState(false);

  const user = useSelector((state) => state.user.userInfo);
 // console.log(user);

  // 주의! 다른 헤더 버튼 누르면 열려져 있던 나머지 모달창은 닫혀야 함. 그래서 open 에 나머지 modal false 값 넣어줌.
  const openAlarm = () => {
    setShowAlarmModal(true);
    setShowChatModal(false);
    setShowInfoModal(false);
  };
  const closeAlarm = () => {
    setShowAlarmModal(false);
  };

  const openChat = () => {
    setShowChatModal(true);
    setShowAlarmModal(false);
    setShowInfoModal(false);
  };
  const closeChat = () => {
    setShowChatModal(false);
  };

  const openInfo = () => {
    setShowInfoModal(true);
    setShowAlarmModal(false);
    setShowChatModal(false);
  };
  const closeInfo = () => {
    setShowInfoModal(false);
  };

  const alertLogin = () => {
    history.push("/login");
  };

  if(is_studyroom){
    return(
      <>
          <HeaderContainer>
            <img src={logo} alt="" />
            <div className="header_menu_container">
              <HeaderIconNone className="header_alarm" />
              <HeaderIconNone className="header_msg" />
              <HeaderIconNone className="header_friend" />
            </div>
          </HeaderContainer>
        </>
    );
  }

  return (
    <div>
      {user ? (
        <>
          <HeaderContainer>
            <img
              src={logo}
              alt=""
              onClick={() => {
                history.push("/");
              }}
            />
            <div className="header_menu_container">
              <HeaderIcon className="header_alarm" onClick={openAlarm} />
              <HeaderIcon className="header_msg" onClick={openChat} />
              <HeaderIcon className="header_friend" onClick={openInfo} />
            </div>
          </HeaderContainer>

          <AlarmModal showModal={showAlarmModal} closeModal={closeAlarm} />
          <OneChatModal showModal={showChatModal} closeModal={closeChat} />
          <InfoModal showModal={showInfoModal} closeModal={closeInfo} />
        </>
      ) : (
        <>
          <HeaderContainer>
            <img
              src={logo}
              alt=""
              onClick={() => {
                history.push("/");
              }}
            />
            <div className="header_menu_container">
              <HeaderIcon className="header_alarm" onClick={alertLogin} />
              <HeaderIcon className="header_msg" onClick={alertLogin} />
              <HeaderIcon className="header_friend" onClick={alertLogin} />
            </div>
          </HeaderContainer>
        </>
      )}
    </div>
  );
}

export default Header;

const HeaderContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 4px 10px rgba(238, 238, 238, 0.25);
  height: 80px;
  padding: 0 100px;
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  background: #fff;
  z-index: 2;
  > img {
    height: 40px;
  }

  .header_menu_container {
    display: flex;
  }
`;

const HeaderIcon = styled.div`
  width: 57px;
  height: 57px;
  border-radius: 11px;
  margin-left: 50px;
  cursor:pointer;

  &.header_alarm {
    width: 57px;
    height: 57px;
    background-image: url(${bell});
    background-size: 60%;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }

  &.header_msg {
    width: 57px;
    height: 57px;
    background-image: url(${chat});
    background-size: 60%;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }

  &.header_friend {
    width: 57px;
    height: 57px;
    background-image: url(${people});
    background-size: 60%;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }
  :hover {
    background-color: #f4f4f4;
  }
`;

const HeaderIconNone = styled.div`
  width: 57px;
  height: 57px;
  border-radius: 11px;
  margin-left: 50px;
 

  &.header_alarm {
    width: 57px;
    height: 57px;
    background-image: url(${bellnone});
    background-size: 60%;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }

  &.header_msg {
    width: 57px;
    height: 57px;
    background-image: url(${chatnone});
    background-size: 60%;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }

  &.header_friend {
    width: 57px;
    height: 57px;
    background-image: url(${peoplenone});
    background-size: 60%;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }

`;
