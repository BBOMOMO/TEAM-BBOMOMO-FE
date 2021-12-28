import React from "react";
import styled from "styled-components";
import camera from "../Images/ic-camera-movie.png";
import person from "../Images/ic-people.png";
import timer from "../Images/ic-timer.png";

const GroupBx = (props) => {
  const { roomLock } = props;

  if (roomLock) {
    return (
      <GroupContBx>
        <GroupCont>
          <div className="group_left_bx">
            <div>
              <h2 className="group_left_h2">
                <span>수능공부</span>안녕
              </h2>
            </div>
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
              <img src={camera} alt="카메라 아이콘" />
            </div>
            <div className="ic_bottom_bx">
              <img src={person} alt="사람 아이콘" />
              <p>2 / 6</p>
            </div>
          </div>
        </GroupCont>
        <GroupContLock>
          <img src={timer} alt="시계" />
          <p>집중시간</p>
        </GroupContLock>
      </GroupContBx>
    );
  }
  return (
    <GroupCont>
      <div className="group_left_bx">
        <div>
          <h2 className="group_left_h2">
            <span>수능공부</span>안녕
          </h2>
        </div>
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
          <img src={camera} alt="카메라 아이콘" />
        </div>
        <div className="ic_bottom_bx">
          <img src={person} alt="사람 아이콘" />
          <p>2 / 6</p>
        </div>
      </div>
    </GroupCont>
  );
};
const GroupContBx = styled.div`
  position: relative;
`;
const GroupContLock = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 330px;
  height: 180px;
  border-radius: 11px;
  background-color: rgba(255, 255, 255, 0.7);
  box-sizing: border-box;
  img {
    width: 28px;
    height: 34px;
  }
  p {
    margin-top: 10px;
    color: #486bff;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
  }
`;
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
