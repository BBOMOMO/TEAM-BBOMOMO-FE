import React from "react";
import styled from "styled-components";
import MyContents from "./MyContents";
import roundCircle from "../Images/timestat/notimestat.png";
import user from "../Images/nouser_2.png";
import pencil from "../Images/pencil.png";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Spinner from "../shared/Spinner";
import { history } from "../redux/configureStore";

const NoInfo = (props) => {

  let userId = localStorage.getItem("id");

  return (
    <>
      <div className="myinfo_container">
      <div className="myInfo_contents_wrap">
      {userId ? 
      //로그인 회원 새로고침 시 비로그인 화면 나오는 부분 스피너 처리
      ( <Spinner/>):
      ( <>
          <div className="myinfo_profile_area">
            <CircleWrap>
              <img src={roundCircle} style={{ width: "13.5vw" }} />
              <Circlebar />
            </CircleWrap>
            <img src={user} className="myinfo_user_img" /> 
          </div>
          <div className="myinfo_txt_area">
            <div className="myinfo_nouser_info">
              <h3 className="myinfo_user_name"  onClick={() => { history.push("/login"); }}>
                <span>
                로그인 후 전체 기능을 이용해보세요! 
                </span>
                <ChevronRightIcon />
              </h3>
            </div>
          </div>
        </>
      )}
        <div className="myinfo_make_group disabled" 
        onClick={()=>{
          window.alert("로그인 후 사용하세요.");
          history.push("/login");
        }}>
          <p>+ 스터디룸 만들기</p>
        </div>
        
        <div className="myinfo_studytime">
          <MyContents/>
        </div>
        
        
      </div>
      </div>
    </>
  );
};

export default NoInfo;
const Circlebar = styled.span`
  position: absolute;
  display: block;
  width: 6.7vw;
  height: 1px;
  *background: #ff0000;
  left: 50%;
  top: 50%;
  z-index: 1;
  transform: rotate(95deg);


  :before {
    content: "";
    position: absolute;
    top: -14px;
    right: -10px;
    display: block;
    /* width: 30px;
    height: 30px; */
    width:1.6vw;
    height:1.6vw;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  }
  transform-origin: left;
  animation: animate 1s forwards;


`;

const CircleWrap = styled.div`
  position: relative;
  display: block;
  /* width: 260px;
  height: 260px; */
  margin: 0 auto;
  margin-top:3vw;
`;