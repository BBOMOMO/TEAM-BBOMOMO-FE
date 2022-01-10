import React from "react";
import profileimg from "../Images/user.png";
// import { useSelector } from "react-redux";
import Moment from "react-moment";
import "moment/locale/ko";
const CertificationCommentList = (props) => {
  const displayCreatedAt = (createdAt) => {
    let startTime = new Date(createdAt);
    let nowTime = Date.now();
    if (parseInt(startTime - nowTime) > -60000) {
      return <Moment format="방금 전">{startTime}</Moment>;
    }
    if (parseInt(startTime - nowTime) < -86400000) {
      return <Moment format="MMM D일">{startTime}</Moment>;
    }
    if (parseInt(startTime - nowTime) > -86400000) {
      return <Moment fromNow>{startTime}</Moment>;
    }
  };
  return (
    <>
      {props ? (
        <div className="certifi_conmment_list">
          <div className="list_profile_bx">
            <div className="list_img_bx">
              <img src={profileimg} alt="프로필 이미지" />
            </div>
            <h4>{props.array.nick}</h4>
            <p>{props.array.comment}</p>
          </div>
          <span>{displayCreatedAt(props.array.createdAt)}</span>
        </div>
      ) : null}
    </>
  );
};

export default CertificationCommentList;
