import React from "react";
import styled from "styled-components";
import { Input } from "../elements";
import { useDispatch } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";

import close from "../Images/ic_header_close.png";

const CertificationEditModal = ({ showModal, closeModal, commentInfo }) => {
  // console.log(commentInfo);
  const dispatch = useDispatch();
  const [commentText, setCommentText] = React.useState(null);
  const editComment = (e) => {
    setCommentText(e.target.value);
  };

  return (
    <>
      {showModal ? (
        <ModalBx>
          <ModalInnerBx>
            <ModalTop>
              <h2>수정하기</h2>
              <img src={close} alt="닫기 아이콘" onClick={closeModal} />
            </ModalTop>
            <ModalInputBx>
              <Input
                text="수정 내용"
                placeholder={commentInfo.cmt}
                value={commentText}
                boxSizing
                display="block"
                margin="20px 0 0 0"
                padding="10px 20px"
                width="23.4375vw"
                height="2.3438vw"
                border="none"
                radius="0.5729vw"
                color="#7A7D81"
                size="0.7292vw"
                _onChange={(e) => {
                  editComment(e);
                }}
              ></Input>
            </ModalInputBx>
            <ModalEditBtn
              onClick={() => {
                const newCommentInfo = {
                  postId: commentInfo.postId,
                  commentId: commentInfo.cmtId,
                  comment: commentText,
                };
                dispatch(commentActions.editCommentDB(newCommentInfo));
                closeModal();
              }}
            >
              수정
            </ModalEditBtn>
          </ModalInnerBx>
        </ModalBx>
      ) : null}
    </>
  );
};

const ModalBx = styled.div`
  position: absolute;
  width: 28.5417vw;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: #fff;
  border-radius: 0.83vw;
  box-shadow: 0px 4px 35px 4px rgba(162, 162, 162, 0.25);
`;

const ModalInnerBx = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5625vw 2.3438vw;
`;
const ModalTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 14px;
  width: 100%;
  border-bottom: 1px solid #e7e7e7;
  h2 {
    color: #242424;
    font-size: 0.9375vw;
    font-weight: 600;
  }
  img {
    width: 24px;
    height: 24px;
  }
`;
const ModalInputBx = styled.div`
  margin: 35px 0 40px;
`;
const ModalEditBtn = styled.div`
  padding: 0.83vw 0.93vw;
  width: 100%;
  background: #889cf2;
  border-radius: 0.5729vw;
  color: #ffffff;
  font-size: 0.9375vw;
  font-weight: 600;
  text-align: center;
`;

export default CertificationEditModal;
