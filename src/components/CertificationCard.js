import React from "react";
import styled from "styled-components";
import comment from "../Images/ic-comment.png";
import { useDispatch, useSelector } from "react-redux";
const CertificationCard = (props) => {
  const dispatch = useDispatch();
  const _postlist = useSelector((state) => state.post.postList.board);
  // console.log(_postlist, "123");
  // const { sTime } = props;
  const userInfo = useSelector((state) => state.user.userInfo);
  if (userInfo == null) {
    return <></>;
  }
  return (
    <CertifiCont
      className="certifi_card_list_bx"
      style={{ backgroundImage: `url(${props.postImg})` }}
    >
      <div className="certifi_card_top">
        {/* <h2>{sTime}</h2> */}
        <h2>{userInfo.totalRecord[0].total}</h2>
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
  margin: 0 0 12px 11px;
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
