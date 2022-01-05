import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Input from "../elements/Input";
import roundCircle from "../Images/Group3366.png";
import userImg from "../Images/user.png";
import pencil from "../Images/pencil.png";
import CreateGroup from "../components/CreateGroup";
import { history } from "../redux/configureStore";

const MyInfo = (props) => {
  const [showModalCG, setShowModalCG] = React.useState(false);

  //클릭 시 모달창 열기
  const openModal = () => {
    setShowModalCG(true);
  };
  const closeModal = () => {
    setShowModalCG(false);
  };
  const user = useSelector((state) => state.user.userInfo);
  const nickname = user.user[0].nick;
  // const statusMsg = "2022년 수능 화이팅!";
  const statusMsg = user.user[0].statusMsg;
  const today = user.todayRecord[0].today;
  const total = user.totalRecord[0].total;
  const [valueName, setValue] = React.useState(statusMsg);

  return (
    <>
      <div className="myinfo_container">
        <div className="myinfo_profile_area">
          <img src={roundCircle} />
          <img src={userImg} className="myinfo_user_img" />
        </div>
        <div className="myinfo_txt_area">
          <div className="myinfo_user_info">
            <span className="myinfo_user_division">고3</span>
            <h3 className="myinfo_user_name">{nickname}</h3>
          </div>
          <div className="myinfo_user_state_area">
            <Input
              value={valueName}
              _onChange={(e) => setValue(e.target.value)}
              height="36px"
              color="#282828"
              size="13px"
            />
            <img
              src={pencil}
              alt="pencil"
              className="myinfo_user_state_pencil"
            />
          </div>
        </div>
        <div className="myinfo_studytime">
          <div className="myinfo_studytime_top">
            <p className="underline">내 공부시간</p>
            {/* <p>랭킹</p> */}
            {/* 랭킹은 추후 업데이트 */}
          </div>
          <div className="myinfo_studytime_mid">
            <p className="myinfo_studytime_today">Today</p>
            <p className="myinfo_studytime_today_time">{today}</p>
          </div>
          <div className="myinfo_studytime_bot">
            <p className="myinfo_studytime_total">Total</p>
            <p className="myinfo_studytime_total_time">{total}</p>
          </div>
        </div>
        <div className="myinfo_make_group">
          <p onClick={openModal}>+ 그룹 만들기</p>
          <CreateGroup showModal={showModalCG} closeModal={closeModal} />
        </div>
      </div>
    </>
  );
};

export default MyInfo;
