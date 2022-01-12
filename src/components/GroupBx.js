import { replace } from "lodash";
import React from "react";
import styled from "styled-components";
import camera from "../Images/ic-camera-movie.png";
import person from "../Images/ic-people.png";
import timer from "../Images/ic-timer.png";

const GroupBx = (props) => {
  const { roomLock, bgcolor, onClick } = props;
  // console.log("이건뭐지", roomLock);
  const userlist = props.peopleInRoom;

 // console.log("목적 뜨나",props.purpose);
  const [purpose, setPurpose] = React.useState("");

  React.useEffect(()=>{

    if(props.purpose === 0 ){
      setPurpose("자율학습");
    }else if(props.purpose === 1 ){
      setPurpose("시험공부");
    }else if(props.purpose === 2 ){
      setPurpose("수능공부");
    }else if(props.purpose === 3 ){
      setPurpose("자격증");
    }else if(props.purpose === 4 ){
      setPurpose("공무원");
    }else if(props.purpose === 5 ){
      setPurpose("기타");
    }
   
  },[purpose]);
  
  return (
    <GroupCont className={bgcolor}>
      <div className="group_left_bx">
        <div>
          <h2 className="group_left_h2">
            <span>{purpose}</span>
            {props.roomTittle}
          </h2>
        </div>
        <div className="state_name_bx">
          {userlist &&
            userlist.map((p, idx) => {
              return (
                <div className="group_name_wrap">
                  <p className="state_name_txt" key={p.idx}>
                    <span className="state_name_circle">동그라미</span>
                    {/* 이 부분 닉네임으로 넘겨주기로 했음 */}
                    {p.nick}
                  </p>
                </div>
              );
            })}
        </div>
      </div>

      <div className="group_right_bx">
        <div className="ic_top_bx">
          <img src={camera} alt="카메라 아이콘" />
        </div>
        <div className="ic_bottom_bx">
          <img src={person} alt="사람 아이콘" />
          <p>{userlist.length} / 6</p>
        </div>
      </div>

      {roomLock ? (
        <div className={roomLock}>
          <img src={timer} alt="타이머 아이콘" />
          <p>집중시간</p>
        </div>
      ) : null}
    </GroupCont>
  );
};

GroupBx.defaultProps = {
  _onClick: () => {},
};

const GroupCont = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 20px 22px 16px;
  width: 330px;
  height: 180px;
  border-radius: 11px;
  background-color: #eee;
  box-sizing: border-box;
  overflow: hidden;
`;

export default GroupBx;
