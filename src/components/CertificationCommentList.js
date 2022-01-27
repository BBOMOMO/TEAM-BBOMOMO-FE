import React, { useState } from "react";
import styled from "styled-components";
import Moment from "react-moment";
import "moment/locale/ko";

import CertificationDeleteModal from "./CertificationDeleteModal";
import CertificationEditModal from "./CertificationEditModal";
import profileimg_default from "../Images/nouser_2.png";
import menu from "../Images/ic-comment-menu.png";

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

  const [commentInfo, setCommentInfo] = useState();
  const [showEditToggle, setShowEditToggle] = useState(false);
  const openEditToggle = () => {
    if (showEditToggle === false) {
      setShowEditToggle(true);
    } else {
      setShowEditToggle(false);
    }
    setShowEditToggle(true);
  };
  const closeEditToggle = () => {
    setShowEditToggle(false);
  };
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const openDeleteBtn = () => {
    setShowDeleteModal(true);
  };
  const closeDeleteBtn = () => {
    setShowDeleteModal(false);
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const openEditBtn = () => {
    setShowEditModal(true);
  };
  const closeEditBtn = () => {
    setShowEditModal(false);
  };

  return (
    <>
      {props ? (
        <div
          className="certifi_conmment_list"
          onClick={() => {
            if (showEditToggle === true) {
              closeEditToggle();
            }
          }}
        >
          <BindCmt>
            <div className="list_profile_bx">
              <div className="list_img_bx">
                {props.User.profileImg !== null ? (
                  <img src={props.User.profileImg} alt="프로필 이미지" />
                ) : (
                  <img src={profileimg_default} alt="프로필 이미지" />
                )}
              </div>
              <h4>{props.User.nick}</h4>
              <p>{props.comment}</p>
            </div>

            <span>{displayCreatedAt(props.createdAt)}</span>
          </BindCmt>
          {props.sameUser ? (
            <ChangeBtnBx
              onClick={() => {
                setCommentInfo({
                  postId: props.postId,
                  cmtId: props.commentId,
                  cmt: props.comment,
                });
                openEditToggle();
              }}
            >
              {showEditToggle ? (
                <ChangeCmt>
                  <p
                    className="EditP"
                    onClick={() => {
                      closeEditToggle();
                      openEditBtn();
                    }}
                  >
                    수정
                  </p>
                  <p
                    className="DeleteP"
                    onClick={() => {
                      closeEditToggle();
                      openDeleteBtn();
                    }}
                  >
                    삭제
                  </p>
                </ChangeCmt>
              ) : null}
            </ChangeBtnBx>
          ) : null}

          <CertificationEditModal
            showModal={showEditModal}
            closeModal={closeEditBtn}
            commentInfo={commentInfo}
          />
          <CertificationDeleteModal
            showModal={showDeleteModal}
            closeModal={closeDeleteBtn}
            commentInfo={commentInfo}
          />
        </div>
      ) : (
        <div className="certifi_conmment_list">
          <div className="list_profile_bx">
            <div className="list_img_bx">
              <img src={profileimg_default} alt="프로필 이미지" />
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
const BindCmt = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  span {
    margin-right: 0.69vw;
    color: #a3a6aa;
    font-size: 0.8vw;
  }
`;
const ChangeBtnBx = styled.div`
  position: relative;
  margin-top: 0.3vw;
  width: 1.46vw;
  height: 1.46vw;
  background-image: url(${menu});
  background-size: cover;
  cursor: pointer;
  z-index: 99;
`;
const ChangeCmt = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: absolute;
  top: 0;
  right: 1.8vw;
  width: 4.6875vw;
  height: 4.6875vw;
  background-color: #ffffff;
  box-shadow: 0px 1px 8px 2px rgba(150, 150, 150, 0.25);
  color: #242424;
  font-size: 0.8vw;
  font-weight: 600;
  text-align: center;
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 1px;
    background-color: #e7e7e7;
  }
`;
export default CertificationCommentList;
