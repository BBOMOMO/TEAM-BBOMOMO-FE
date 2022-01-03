import React from "react";
import styled from "styled-components";
import comment from "../Images/ic-comment.png";

const CertificationCard = () => {
  return (
    <CertifiCont>
      <div className="certifi_card_top">
        <h2>10:12</h2>
        <p>안녕하세요 오늘은 2022년 1월1일 입니다</p>
      </div>
      <div className="certifi_card_bottom">
        <p>
          <span className="">동그라미</span>
          나는이서현
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
  background-color: #bef5a4;
  background-size: cover;
  box-sizing: border-box;
  color: #242424;
`;
export default CertificationCard;
