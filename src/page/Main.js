import React from "react";
import styled from "styled-components";
import MyInfo from "../components/MyInfo";
import GroupRecommend from "../components/GroupRecommend";

const Main = (props) => {
  return (
    <>
      <MainContainer>
        <MyInfo />
        <GroupRecommend />
      </MainContainer>
       
     
      
    </>
  );
};

export default Main;

const MainContainer = styled.div`
width:100%;
height:auto; 
display: flex;
`;
