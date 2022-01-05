import React from "react";
import styled from "styled-components";
import MyInfo from "../components/MyInfo";
import NoInfo from "../components/NoInfo";
import GroupRecommend from "../components/GroupRecommend";
import Certification from "../components/Certification";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Main = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const userId = params;
  const user = useSelector((state) => state.user.userInfo);

  React.useEffect(() => {
    dispatch(userActions.checkUserDB());
  }, []);

  return (
    <>
      <MainContainer>
        {user ? <MyInfo /> : <NoInfo />}

        <div>
          <MainSections>
            <GroupRecommend />
          </MainSections>
          <MainSections>
            <Certification />
          </MainSections>
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
`;

const MainSections = styled.div`
  position: relative;
  margin-top: 80px;
  width: 100%;
  height: 65vh;
  border: 1px solid #eee;
  overflow: scroll;
  :nth-child(2) {
    margin-top: 0;
  }
`;
