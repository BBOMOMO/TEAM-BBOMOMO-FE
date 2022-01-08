import React from "react";
import styled from "styled-components";
import comment from "../Images/ic-comment.png";
import commentWhite from "../Images/ic-comment-white.png";
import { useSelector } from "react-redux";

const CertificationCard = (props) => {
  const userInfo = useSelector((state) => state.user.studyTotal);

  return (
    <CertifiCont
      className={props.sortBg}
      style={{ backgroundImage: `url(${props.postImg})` }}
    >
      <div className="certifi_card_relative">
        <div className="certifi_card_top">
          {userInfo === null ? (
            <h2>00:00</h2>
          ) : (
            <h2>{userInfo}</h2>
          )}

          <p>{props.postContent}</p>
        </div>
        <div className="certifi_card_bottom">
          <p>
            <span className="">동그라미</span>
            {props.nick}
          </p>

          <div className="certifi_card_bottom_comment">
            {props.postImg.includes("https") ? (
              <img src={commentWhite} alt="댓글 아이콘" />
            ) : (
              <img src={comment} alt="댓글 아이콘" />
            )}
            <p>1</p>
          </div>
        </div>
      </div>
    </CertifiCont>
  );
};

const CertifiCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  width: 330px;
  height: 408px;
  border-radius: 11px;
  background-size: cover;
  box-sizing: border-box;
`;
export default CertificationCard;
