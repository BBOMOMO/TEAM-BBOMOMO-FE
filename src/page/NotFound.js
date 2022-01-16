import React from 'react';
import styled from "styled-components";
import {history} from "../redux/configureStore";

function NotFound() {
  return (
    <Container>
      
      <h1>
        요청하신 페이지를 찾을 수 없습니다.<br/>
        Page Not Found.
      </h1>
      <GoHome onClick={()=>{console.log("클릭");history.push('/')}}>
        홈으로 이동
      </GoHome>
    </Container>
  )
}

export default NotFound;

const Container = styled.div`
  padding-top:110px; 
  text-align:center;
  > h1 {
    font-weight:bold;
    font-size:30px; 
    line-height:1.5;
  }
`;

const GoHome = styled.button`
  width:498px;
  height:70px;
  background:#486bff;
  border-radius:11px;
  color:#fff;
  font-size:24px;
  border:none;
  cursor:pointer;
  font-family: 'Pretendard';

`;
