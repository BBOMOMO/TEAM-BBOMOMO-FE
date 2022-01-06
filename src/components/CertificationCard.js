import React, { useState } from "react";
import styled from "styled-components";
import comment from "../Images/ic-comment.png";
import BG1 from "../Images/study-certification-bg-1.png";
import BG2 from "../Images/study-certification-bg-2.png";
import BG3 from "../Images/study-certification-bg-3.png";
import BG4 from "../Images/study-certification-bg-4.png";

const CertificationCard = (props) => {
  const { sTime } = props;
  console.log(props.postImg);
  return (
    <CertifiCont style={{ backgroundImage: `url(${props.postImg})` }}>
      <div className="certifi_card_top">
        <h2>{sTime}</h2>
        <p>{props.postContent}</p>
      </div>
      <div className="certifi_card_bottom">
        <p>
          <span className="">동그라미</span>
          {props.nick}
        </p>

        <div className="certifi_card_bottom_comment">
          <img src={comment} alt="댓글 아이콘" />
          <p>7</p>
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
  margin-bottom: 12px;
  padding: 40px 23px 27px;
  width: 330px;
  height: 408px;
  border-radius: 11px;
  /* background-color: #bef5a4; */
  background-size: cover;
  box-sizing: border-box;
  color: #242424;
`;
export default CertificationCard;
