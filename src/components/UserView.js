import React from "react";
import styled from "styled-components";
import view from "../Images/view.png";
import profile from "../Images/profile.png";
const UserView = (props) => {
  return (
    <>
      <div className="userview_container">
        {/* box start */}
        <div className="userview_box">
          <div className="userview_imgbox">
            <img src={view} alt="view" />
            <div className="userview_imgtext">
              <p className="userview_total">총 공부시간</p>
              <p className="userview_total_time">02 : 35 : 23</p>
            </div>
          </div>
          <div className="userview_txtbox clearfix">
            <img src={profile} alt="프로필" className="fl" />
            <div className="userview_name fl">
              <p>김철수</p>
              <p>수능 11111도전</p>
            </div>
            <div className="fr userview_friend">친구신청</div>
          </div>
        </div>
        {/* box end */}
        {/* box start */}
        <div className="userview_box">
          <div className="userview_imgbox">
            <img src={view} alt="view" />
            <div className="userview_imgtext">
              <p className="userview_total">총 공부시간</p>
              <p className="userview_total_time">02 : 35 : 23</p>
            </div>
          </div>
          <div className="userview_txtbox clearfix">
            <img src={profile} alt="프로필" className="fl" />
            <div className="userview_name fl">
              <p>김철수</p>
              <p>수능 11111도전</p>
            </div>
            <div className="fr userview_friend white">신청취소</div>
          </div>
        </div>
        {/* box end */}
        {/* box start */}
        <div className="userview_box">
          <div className="userview_imgbox">
            <img src={view} alt="view" />
            <div className="userview_imgtext">
              <p className="userview_total">총 공부시간</p>
              <p className="userview_total_time">02 : 35 : 23</p>
            </div>
          </div>
          <div className="userview_txtbox clearfix">
            <img src={profile} alt="프로필" className="fl" />
            <div className="userview_name fl">
              <p>김철수</p>
              <p>수능 11111도전</p>
            </div>
            <div className="fr userview_friend">친구신청</div>
          </div>
        </div>
        {/* box end */}
        {/* box start */}
        <div className="userview_box">
          <div className="userview_imgbox">
            <img src={view} alt="view" />
            <div className="userview_imgtext">
              <p className="userview_total">총 공부시간</p>
              <p className="userview_total_time">02 : 35 : 23</p>
            </div>
          </div>
          <div className="userview_txtbox clearfix">
            <img src={profile} alt="프로필" className="fl" />
            <div className="userview_name fl">
              <p>김철수</p>
              <p>수능 11111도전</p>
            </div>
            <div className="fr userview_friend white">신청취소</div>
          </div>
        </div>
        {/* box end */}
        {/* box start */}
        <div className="userview_box">
          <div className="userview_imgbox">
            <img src={view} alt="view" />
            <div className="userview_imgtext">
              <p className="userview_total">총 공부시간</p>
              <p className="userview_total_time">02 : 35 : 23</p>
            </div>
          </div>
          <div className="userview_txtbox clearfix">
            <img src={profile} alt="프로필" className="fl" />
            <div className="userview_name fl">
              <p>김철수</p>
              <p>수능 11111도전</p>
            </div>
            <div className="fr userview_friend">친구신청</div>
          </div>
        </div>
        {/* box end */}
        {/* box start */}
        <div className="userview_box">
          <div className="userview_imgbox">
            <img src={view} alt="view" />
            <div className="userview_imgtext">
              <p className="userview_total">총 공부시간</p>
              <p className="userview_total_time">02 : 35 : 23</p>
            </div>
          </div>
          <div className="userview_txtbox clearfix">
            <img src={profile} alt="프로필" className="fl" />
            <div className="userview_name fl">
              <p>김철수</p>
              <p>수능 11111도전</p>
            </div>
            <div className="fr userview_friend white">신청취소</div>
          </div>
        </div>
        {/* box end */}
      </div>
    </>
  );
};

export default UserView;
