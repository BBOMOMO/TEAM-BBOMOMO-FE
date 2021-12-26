import React from "react";
import styled from "styled-components";
import { Button, Input } from "../Elements";

function Modal() {
  return (
    <ModalContainer>
      <ModalBox>
        <h2>그룹 방 만들기</h2>
        <hr />
        <Input text="방제" placeholder="공부 목적을 적어주세요" />
        <select text="공부 목적" type="selectbox">
          <option value="">수능</option>
        </select>
        <Input text="라운드" placeholder="공부 목적을 적어주세요" />
        <Input
          text="공부 시간/쉬는 시간"
          placeholder="공부 목적을 적어주세요"
        />
      </ModalBox>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  background-color: #000;
  opacity: 0.54;
`;

const ModalBox = styled.div`
  position: fixed;
  width: 548px;
  height: 713px;
  border-radius: 16px;
  background-color: #fff;
  top: 50%;
  left: 50%;
  margin-top: -356px;
  margin-left: -274px;
`;

export default Modal;
