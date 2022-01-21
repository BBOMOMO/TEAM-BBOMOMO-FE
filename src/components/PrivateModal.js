import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as roomActions } from "../redux/modules/group";
import styled from "styled-components";
import Close from "../Images/ic_header_close.png";
import Input from "../elements/Input";

const Private = (props) => {
  const dispatch = useDispatch();
  const [pwd, setPwd] = useState("");
  const roomId = useSelector((state) => state.group.roomState.roomId);
  const onChangePwd = (e) => {
    const pwdcurrent = e.target.value;
    setPwd(pwdcurrent);
    console.log(pwd);
  };
  return (
    <>
      <PrivateModalContainer>
        <PrivateModalDim></PrivateModalDim>
        <PrivateModal>
          <PrivateModalTop>
            <p className="privateModal_top_title">입장하기</p>
            <img
              src={Close}
              alt="닫기"
              className="privateModal_top_close"
              onClick={() => {
                dispatch(roomActions.privateState(false));
              }}
            />
          </PrivateModalTop>
          <PrivateModalMid>
            <p className="privateModal_mid_password">비밀번호</p>
            <Input height="4.51vh" _onChange={onChangePwd} value={pwd} />
          </PrivateModalMid>
          <PrivateModalBot>
            <p
              className="privateModal_bot_btn"
              onClick={() => {
                dispatch(roomActions.roomPwCheckDB(roomId, pwd));
              }}
            >
              입장하기
            </p>
          </PrivateModalBot>
        </PrivateModal>
      </PrivateModalContainer>
    </>
  );
};
const PrivateModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  height: 100vh;
  width: 100vw;
`;
const PrivateModalDim = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: 54%;
`;
const PrivateModal = styled.div`
  width: 28.54vw;
  height: 32.27vh;
  background: #fff;
  border-radius: 16px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0 2.29vw;
  box-sizing: border-box;
`;
const PrivateModalTop = styled.div`
  width: 100%;
  height: 7.68vh;
  border-bottom: 1px solid #e7e7e7;
  position: relative;
  .privateModal_top_title {
    font-size: 1.84vh;
    font-weight: 600;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
  .privateModal_top_close {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    height: 2.46vh;
    width: 1.25vw;
  }
`;
const PrivateModalMid = styled.div`
  width: 100%;
  .privateModal_mid_password {
    margin: 3.69vh 0 0.82vh 0.73vw;
    font-size: 1.43vh;
  }
`;
const PrivateModalBot = styled.div`
  width: 100%;
  padding-top: 3.69vh;
  .privateModal_bot_btn {
    width: 100%;
    height: 5.53vh;
    background: #889cf2;
    border-radius: 11px;
    color: #fff;
    font-size: 1.84vh;
    font-weight: 600;
    text-align: center;
    line-height: 5.53vh;
  }
`;

export default Private;
