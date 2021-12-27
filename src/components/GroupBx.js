import React from "react";
import styled from "styled-components";
import lock from "../Images/ic-lock-alt.png";
import camera from "../Images/ic-camera-movie.png";
import person from "../Images/ic-people.png";

const GroupBx = () => {
  return (
    <GroupCont>
      <div className="group_left_bx">
        <div>
          <h2 className="group_left_h2">
            <span>수능공부</span>안녕
          </h2>
        </div>
        {/* <div style={{ width: "100px" }}>sdad{qwe}</div> */}
        <div className="state_name_bx">
          <p className="state_name_txt">
            <span className="state_name_circle">동그라미</span>
            나는이서현나는이서현나는이서현나는이서현나는이서현나는이서현
          </p>

          <p className="state_name_txt">
            <span className="state_name_circle">동그라미</span>
            나는이서현나는이서현
          </p>

          <p className="state_name_txt">
            <span className="state_name_circle">동그라미</span>
            나는이서현나는이서현나는이서현
          </p>

          <p className="state_name_txt">
            <span className="state_name_circle">동그라미</span>
            나는이서현나는
          </p>
        </div>
      </div>

      <div className="group_right_bx">
        <div className="ic_top_bx">
          <img src={camera} alt="" />
          <img src={lock} alt="" />
        </div>
        <div className="ic_bottom_bx">
          <img src={person} alt="" />
          <p>2 / 6</p>
        </div>
      </div>
    </GroupCont>
  );
};

const GroupCont = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 22px 16px;
  width: 330px;
  height: 180px;
  border-radius: 11px;
  background-color: #bef5a4;
  box-sizing: border-box;
`;

export default GroupBx;
