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
      <div onClick={()=>{console.log("클릭");history.push('/')}}>
        홈으로 이동
      </div>
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
