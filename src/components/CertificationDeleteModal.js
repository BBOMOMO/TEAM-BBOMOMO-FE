import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";

import close from "../Images/ic_header_close.png";

const CertificationDeleteModal = ({ showModal, closeModal, commentInfo }) => {
  const dispatch = useDispatch();
  return (
    <>
      {showModal ? (
        <ModalBx>
          <ModalInnerBx>
            <CloseBtnBx onClick={closeModal}>
              <img src={close} alt="닫기 아이콘" />
            </CloseBtnBx>
            <ModalP>정말 삭제하시겠습니까?</ModalP>
            <ModalDeleteBtn
              onClick={() => {
                dispatch(commentActions.deleteCommentDB(commentInfo));
                closeModal();
              }}
            >
              삭제
            </ModalDeleteBtn>
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
  border-radius: 16px;
  box-shadow: 0px 4px 35px 4px rgba(162, 162, 162, 0.25);
`;

const ModalInnerBx = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5625vw 2.3438vw;
`;
const CloseBtnBx = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  img {
    width: 1.25vw;
    height: 1.25vw;
  }
`;
const ModalP = styled.div`
  margin: 30px 0 60px;
  color: #242424;
  font-size: 0.9375vw;
  font-weight: 600;
`;
const ModalDeleteBtn = styled.div`
  padding: 0.83vw 0.93vw;
  width: 100%;
  background: #889cf2;
  border-radius: 11px;
  color: #ffffff;
  font-size: 0.9375vw;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
`;
export default CertificationDeleteModal;
