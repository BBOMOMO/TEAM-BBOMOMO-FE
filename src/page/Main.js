import React from "react";
import styled from "styled-components";
import MyInfo from "../components/MyInfo";
import GroupRecommend from "../components/GroupRecommend";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Main = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const userId = params.userId;

  React.useEffect(() => {
    // dispatch(userActions.checkUserDB(userId));
  }, []);
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
  width: 100%;
  height: auto;
  display: flex;
`;
