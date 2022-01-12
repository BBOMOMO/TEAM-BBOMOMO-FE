import React from "react";
import styled from "styled-components";
import MyContents from "./MyContents";
import roundCircle from "../Images/timestat/notimestat.png";
import user from "../Images/nouser_2.png";
import pencil from "../Images/pencil.png";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { history } from "../redux/configureStore";

const NoInfo = (props) => {
  return (
    <>
      <div className="myinfo_container">
        <div className="myinfo_profile_area">
          <img src={roundCircle} style={{ width: "260px" }} />
          <img src={user} className="myinfo_user_img" />

         
        </div>
        <div className="myinfo_txt_area">
          <div className="myinfo_nouser_info">
            <h3 className="myinfo_user_name">
              <span
                onClick={() => {
                  history.push("/login");
                }}
              >
                {" "}
                로그인{" "}
              </span>{" "}
              /
              <span
                onClick={() => {
                  history.push("/signup");
                }}
              >
                {" "}
                회원가입{" "}
              </span>
              <ChevronRightIcon />
            </h3>
          </div>
        </div>
        <div className="myinfo_studytime">
          <MyContents/>
        </div>
        
        <div className="myinfo_make_group disabled" 
        onClick={()=>{
          window.alert("로그인 후 사용하세요.");
          history.push("/login");
        }}
        
        >
          <p>+ 스터디룸 만들기</p>
        </div>
      </div>
    </>
  );
};

export default NoInfo;
