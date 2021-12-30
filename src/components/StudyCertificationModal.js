import React from "react";
import styled from "styled-components";
// import { Button, Input, Select } from "../elements/index";
// import {history} from "../redux/configureStore";

const StudyCertificationModal = () => {
  return (
    <>
      <ModalContainer>
        <ModalBG>
          <ModalBox>
            <ModalInnerContainer>잉</ModalInnerContainer>
          </ModalBox>
        </ModalBG>
      </ModalContainer>
    </>
  );
};

const ModalContainer = styled.div`
  position: relative;
`;

const ModalBG = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: 0.54;
  z-index: 999;
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
  z-index: 1000;
  line-height: 1.2;
`;

const ModalInnerContainer = styled.div`
  width: 460px;
  height: auto;
  margin: 0 auto;
  margin-top: 37px;
  text-align: left;
`;

export default StudyCertificationModal;
