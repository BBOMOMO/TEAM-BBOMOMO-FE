import React from "react";
import styled from "styled-components";
import FooterLogo from "../Images/footerlogo.png";

const Footer = () => {
  return (
    <FooterContainer>
      <ul>
        <li>공지사항</li>
        <li>
          <a href="https://bit.ly/bbomomo" target="_blank">
            뽀모모팀 소개
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/bbomomo/" target="_blank">
            뽀모모팀 인스타그램
          </a>
        </li>
        <li>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScnvlLWbDtzPT7UTagUx4uvRVLbmeAsA-NkmhbvrvWzPqLQcA/viewform?usp=sf_link"
            target="_blank"
          >
            버그제보
          </a>
        </li>
      </ul>
      <div>
        <img src={FooterLogo} alt="footerLogo" />
      </div>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  width: 100%;
  height: 5.5vw;
  background: #eff6f8;
  color: #959595;
  font-size: 0.8vw;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 9vw 0 9vw;
  box-sizing: border-box;

  > ul {
    display: flex;
    align-items: center;
  }
  > ul li {
    display: inline-block;
    margin-right: 2vw;
  }

  > ul li:after {
    content: "";
    position: absolute;
    width: 1px;
    height: 1.1vw;
    margin-left: 0.9vw;
    background-color: #e7e7e7;
  }
  > ul li:last-child:after {
    display: none;
  }
`;
