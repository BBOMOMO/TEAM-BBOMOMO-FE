import React from 'react';
import styled from "styled-components";
import FooterLogo from '../Images/footerlogo.png'

const Footer = () => {

  return(
    <FooterContainer>
      <ul>
        <li>공지사항</li>
        <li>뽀모모팀 소개</li>
        <li>뽀모모팀 인스타그램</li>

      </ul>
      <div>
        <img src={FooterLogo} alt="footerLogo" />
      </div>
    </FooterContainer>
  );
}

export default Footer;

const FooterContainer = styled.div`
  width:100%;
  height:100px;
  background: #eff6f8;
  color:#959595;
  font-size:16px;
  font-weight:500;
  display:flex;
  align-items:center;
  justify-content: space-between;
  padding:0 120px 0 200px;
  box-sizing: border-box;
  
  >ul {
    display:flex;
    align-items:center;
    
  }
  >ul li {
    display:inline-block;
    margin-right:30px; 
  }

  >ul li:after {
    content:'';
    position:absolute;
    width:1px;
    height:18px;
    margin-left:14px; 
    background-color: #e7e7e7;
  }
  > ul li:last-child:after {
    display:none;
  }
`;