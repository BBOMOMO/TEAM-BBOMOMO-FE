import React from "react";
import profileimg from "../Images/nouser_2.png";
import Moment from "react-moment";
import "moment/locale/ko";

const CertificationCommentList = (props) => {
  console.log(props.User);
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
              {/* <img src={profileimg} alt="프로필 이미지" /> */}
              {props.profileImg !== null ? (
                <img src={props.profileImg} alt="프로필 이미지" />
              ) : (
                <img src={profileimg} alt="프로필 이미지" />
              )}
            </div>
            {/* <h4>{props.User.nick}</h4> */}
            <p>{props.comment}</p>
          </div>

          <span>{displayCreatedAt(props.createdAt)}</span>
        </div>
      ) : (
        <div className="certifi_conmment_list">
          <div className="list_profile_bx">
            <div className="list_img_bx">
              <img src={profileimg} alt="프로필 이미지" />
            </div>
            <h4>아직 댓글이 없어요</h4>
            <p></p>
          </div>
          <span></span>
        </div>
      )}
    </>
  );
};

export default CertificationCommentList;
