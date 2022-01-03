import React from "react";
import styled from "styled-components";
import roundCircle from "../Images/timestat/notimestat.png";
import user from "../Images/nouser.png";
import pencil from "../Images/pencil.png";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import {history} from "../redux/configureStore";

const NoInfo = (props) => {
  




  return (
    <>
      <div className="myinfo_container">
        <div className="myinfo_profile_area">
          <img src={roundCircle} style={{width:"260px"}}/>
          <img src={user} className="myinfo_user_img" />
        </div>
        <div className="myinfo_txt_area">
          <div className="myinfo_nouser_info">
            <h3 className="myinfo_user_name">
              <span onClick={()=>{history.push("/login")}}> 로그인 </span> / 
              <span onClick={()=>{history.push("/signup")}}> 회원가입 </span>
              <ChevronRightIcon/></h3>
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
            <p className="myinfo_studytime_today_time">00:00</p>
          </div>
          <div className="myinfo_studytime_bot">
            <p className="myinfo_studytime_total">Total</p>
            <p className="myinfo_studytime_total_time">00:00</p>
          </div>
        </div>
        <div className="myinfo_make_group disabled">
          <p>+ 그룹 만들기</p>
         
        </div>
      </div>
    </>
  );
};

export default NoInfo;

