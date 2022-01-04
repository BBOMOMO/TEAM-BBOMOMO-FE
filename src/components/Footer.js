import React from 'react';
import styled from "styled-components";

const Footer = () => {

  return(
    <FooterContainer>
    Footer 인데여
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
`;