import React from "react";
import styled from "styled-components";
import MyInfo from "../components/MyInfo";
import NoInfo from "../components/NoInfo";
import Header from "../components/Header";
import GroupRecommend from "../components/GroupRecommend";
import Certification from "../components/Certification";
import Footer from "../components/Footer";
import MainBanner from "../components/MainBanner";
import PrivateModal from "../components/PrivateModal";
// import Banner from "../Images/banner.png";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as groupAction } from "../redux/modules/group";

const Main = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const _private = useSelector((state) => state.group.roomState.privateState);
  //console.log(user);
  let userId = localStorage.getItem("id");
  let userNick = localStorage.getItem("nick");
  React.useEffect(() => {
    dispatch(userActions.checkUserDB());
    dispatch(userActions.getRankDB());
    dispatch(groupAction.groupRound(1));
  }, []);

  return (
    <>
      {_private ? <PrivateModal /> : null}
      <Header />
      <MainContainer>
        <div className="main_wrap_index">{user ? <MyInfo /> : <NoInfo />}</div>

        <div className="main_wrap">
          <div className="main_contentArea">
            {/* TODO: AdSection Onclick 이벤트페이지로 이동. 있으면 ㅎ */}
            <AdSection>
              {/* <img src={Banner} alt="" /> */}
              <MainBanner />
            </AdSection>
            <RoomSection>
              <GroupRecommend />
            </RoomSection>

            <CertifiSection>
              <Certification />
            </CertifiSection>
          </div>

          <Footer />
        </div>
      </MainContainer>
    </>
  );
};

export default Main;

const MainContainer = styled.div`
  //디자인 고도화 때 윈도우사이즈별 사이즈 잡기
  width: 100%;
  height: auto;
  display: flex;
  flex: 1;

  .main_wrap_index {
    position: relative;
    z-index: 1;
    flex: 0.35;
  }
  .main_wrap {
    width: 100%;
    position: relative;
    flex: 0.65;
    *z-index: 0;
  }
  .main_contentArea {
    position: relative;
    *margin-left: 80px;
    width: 52.5vw;
    margin: 0 auto;
    *margin-left: 4vw;
    margin-right: 9vw;
  }
`;

const AdSection = styled.div`
  margin-top: 7vw;
  position: relative;
  width: 100%;
  height: 9vw;
  z-index: 0;
  > img {
    width: 100%;
  }
`;

const RoomSection = styled.div`
  position: relative;
  margin-top: 50px;
  width: 100%;
  min-height: 35vh;
  height: auto;
  *padding-bottom: 60px;
`;

const CertifiSection = styled.div`
  margin-top: 30px;
  position: relative;
  width: 100%;
  min-height: 40vh;
  *height: auto;
  *border: 1px solid #bbb;
  *overflow: scroll;
  padding-bottom: 80px;
`;
