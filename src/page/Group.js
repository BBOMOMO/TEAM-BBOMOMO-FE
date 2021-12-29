import React from "react";
import styled from "styled-components";

import UserView from "../components/UserView";
import GroupRoomTimer from "../components/GroupRoomTimer";
import GroupChat from "../components/GroupChat";

import "../styles/css/chat.css";

const Group = () => {
  return (
    <>
      <GroupContainer>
        <GroupChat/>
        <div className="group_conttainer">
          <GroupRoomTimer />
          <UserView />
        </div>
      </GroupContainer>
    </>
  );
};

export default Group;

const GroupContainer = styled.div`
  padding-top:110px;
  display: flex;
`;

