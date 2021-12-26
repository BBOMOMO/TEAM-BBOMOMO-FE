import React from "react";
import styled from "styled-components";

const GroupBx = () => {
  return (
    <GroupCont>
      <div className="group_left_bx">
        <div>
          <h2 className="group_left_h2">
            <span>수능</span>안녕하세요
          </h2>
        </div>

        <div className="ww">
          <p className="state_name_bx">
            <span className="state_name_circle">동그라미</span>나는 이서현
          </p>
          <p className="state_name_bx">
            <span className="state_name_circle">동그라미</span>나는 서민지
          </p>
          <p className="state_name_bx">
            <span className="state_name_circle">동그라미</span>나는 정종찬
          </p>
          <p className="state_name_bx">
            <span className="state_name_circle">동그라미</span>나는 이서현
          </p>
        </div>
      </div>

      <div className="group_right_bx">
        <div className="ic_top_bx">
          {/* <img src="" alt="" /> */}
          {/* <img src="" alt="" /> */}
        </div>
        <div className="ic_bottom_bx">
          {/* <img src="" alt="" /> */}
          <p></p>
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
