import React from "react";
import styled from "styled-components";
import MyInfo from "../components/MyInfo";
import NoInfo from "../components/NoInfo";
import GroupRecommend from "../components/GroupRecommend";
import Certification from "../components/Certification";
import Footer from "../components/Footer";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Main = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const userId = params;
  const user = useSelector((state) => state.user.userInfo);

  //console.log(user);

  React.useEffect(() => {
    dispatch(userActions.checkUserDB());
  }, []);

  return (
    <>
      <MainContainer>
        {user ? <MyInfo /> : <NoInfo />}

      <div className="main_wrap">
        <div className="main_contentArea">
          {/* TODO: AdSection Onclick 이벤트페이지로 이동. 있으면 ㅎ */}
        <AdSection/>
         
         <RoomSection>
           <GroupRecommend />
         </RoomSection>
 
         <CertifiSection>
           <Certification />
         </CertifiSection>
         
        </div>

        <Footer/>

      </div>

       
        
      </MainContainer>
    </>
  );
};

export default Main;

const MainContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;

  .main_contentArea {
    margin-left:80px; 
  }
`;

const AdSection = styled.div`
  margin-top:120px;
  position:relative;
  width:100%;
  height:150px;
  background:url('/static/media/banner.ea373fe2.png') no-repeat;
  background-size:100%; 
`;

const RoomSection = styled.div`
  position:relative;
  margin-top:50px; 
  width:100%;
  min-height:65vh;
  height:auto;
  *border:1px solid #bbb; 
  padding-bottom:60px; 
`;

const CertifiSection = styled.div`
  margin-top:30px; 
  position:relative;
  width:100%;
  min-height:60vh;
  *height:auto; 
  *border:1px solid #bbb; 
  *overflow:scroll;
  padding-bottom:80px; 

`;