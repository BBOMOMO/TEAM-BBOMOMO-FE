import React from "react";
import styled from "styled-components";
import roundCircle from "../Images/Group3366.png";
import user from "../Images/user.png";
import pencil from "../Images/pencil.png";
const MyInfo = (props) => {
  return (
    <>
      <div className="myinfo_container">
        <div className="myinfo_profile_area">
          <img src={roundCircle} />
          <img src={user} className="myinfo_user_img" />
        </div>
        <div className="myinfo_txt_area">
          <div className="myinfo_user_info">
            <span className="myinfo_user_division">고3</span>
            <h3 className="myinfo_user_name">뽀모모</h3>
          </div>
          <div className="myinfo_user_state_area">
            <p className="myinfo_user_state">2020수능 가자!</p>
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
            <p className="myinfo_studytime_today_time">01:23:34</p>
          </div>
          <div className="myinfo_studytime_bot">
            <p className="myinfo_studytime_total">Total</p>
            <p className="myinfo_studytime_total_time">1233:03:34</p>
          </div>
        </div>
        <div className="myinfo_make_group">
          <p>+ 그룹 만들기</p>
        </div>
      </div>
    </>
  );
};

export default MyInfo;
