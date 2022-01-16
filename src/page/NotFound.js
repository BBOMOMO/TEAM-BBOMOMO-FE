import React from 'react';
import styled from "styled-components";
import {history} from "../redux/configureStore";

import notfoundimg from "../Images/404.png";

function NotFound() {
  return (
    <Container>
      <NotfoundWrap>
        <div className="pageImg">
          <img src={notfoundimg} alt="404 img" />
        </div>
        <h1>
          요청하신 페이지를 찾을 수 없습니다.<br/>
          Page Not Found.
        </h1>
        <GoHome onClick={()=>{console.log("클릭");history.push('/')}}>
          홈으로 이동
        </GoHome>
      </NotfoundWrap>
    </Container>
  )
}

export default NotFound;

const Container = styled.div`

  width:100%;
  height:100vh;
  display: flex;
  justify-content:center;
  align-items: center;

`;
const NotfoundWrap = styled.div`
  width: max(450px);

  text-align:center;
  > h1 {
    font-weight:bold;
    font-size: clamp(16px, 5vw, 30px); 
    line-height:1.5;
    margin :30px 0; 
  }

  > .pageImg > img {
    width:100%; 

  }
`;
const GoHome = styled.button`
  width:100%;
  height:70px;
  background:#486bff;
  border-radius:11px;
  color:#fff;
  font-size: clamp(14px, 5vw, 24px); 
  border:none;
  cursor:pointer;
 font-weight:600;

`;
