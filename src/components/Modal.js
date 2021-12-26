import React from "react";
import '../styles/css/Group.css';
import styled from "styled-components";

import { Button, Input, Select } from "../elements/index";


function Modal() {

  const [purpose, setPurpose] = React.useState('');


  return (
    
    <ModalContainer>
      <ModalBG/>
      <ModalBox>
        <ModalInnerContainer>
          <h2 className="group_modal_title">그룹 방 만들기</h2>
          <div className="group_modal_hr"></div>
          <Input createGroup className="mb20" text="방제" placeholder="공부 목적을 적어주세요" margin="16px 0 0 0"/>
          <Select className="mb20" createGroup text="공부 목적" name="purpose"
           _onChange={(e)=>{  const selectedPurpose = e.target.value;  setPurpose(selectedPurpose); }}>
            <option value="01">수능1</option>
            <option value="02">수능2</option>
            <option value="03">수능3</option>
            <option value="04">수능4</option>
            <option value="05">수능5</option>
          </Select>
          
          <Select className="mb20" createGroup text="라운드" name="round"
           _onChange={(e)=>{  const selectedPurpose = e.target.value;  setPurpose(selectedPurpose); }}>
            <option value="01">1</option>
            <option value="02">2</option>
            <option value="03">3</option>
            <option value="04">4</option>
            <option value="05">5</option>
          </Select>
          <p className="group_modal_subtitle">공부시간/쉬는시간</p>
          <Button groupButton>25분/5분</Button>
          <Button groupButton>25분/5분</Button>

          <p className="group_modal_subtitle">시작시간</p>
          <Button groupButton>바로 시작</Button>
          <Button groupButton>3분 뒤 시작</Button>
          <Button groupButton>5분 뒤 시작</Button>

          <Button
            border="none"
            height="54px"
            radius="11px"
            fontSize="18px"
            margin="40px 0 40px 0"
            weight="600"
          >
            생성하기
          </Button>

        </ModalInnerContainer>
      </ModalBox>
    </ModalContainer>

  );
}

const ModalContainer = styled.div`
  position: relative;

  
`;

const ModalBG = styled.div`
 position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  background-color: #000;
  opacity:0.54;
`;
const ModalBox = styled.div`
  position: fixed;
  width: 548px;
  height: auto;
  border-radius: 16px;
  background-color: #fff;
  top: 50%;
  left: 50%;
  margin-top: -356px;
  margin-left: -274px;
  
`;

const ModalInnerContainer = styled.div`
  width:460px;
  height:auto;
  margin:0 auto; 
  margin-top:37px;
  
`;


export default Modal;
