import React from "react";
import profileimg from "../Images/user.png";

const CertificationCommentList = () => {
  return (
    <div className="certifi_conmment_list">
      <div className="list_profile_bx">
        <div className="list_img_bx">
          <img src={profileimg} alt="프로필 이미지" />
        </div>
        <h4>흑호</h4>
        <p>임인년 검은호랑이의 해</p>
      </div>

      <span>1시간</span>
    </div>
  );
};

export default CertificationCommentList;
