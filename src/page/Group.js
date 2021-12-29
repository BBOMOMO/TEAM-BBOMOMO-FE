import React from "react";
import styled from "styled-components";

import UserView from "../components/UserView";
import GroupRoomTimer from "../components/GroupRoomTimer";

const Group = () => {
  return (
    <>
      <GroupContainer>
        <GroupChat></GroupChat>
        <div>
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

const GroupChat = styled.div`
width:400px; 
height:500px;
background: #bbb;;

`;
