import { replace } from "lodash";
import React from "react";
import styled from "styled-components";
import camera from "../Images/ic-camera-movie.png";
import person from "../Images/ic-people.png";
import timer from "../Images/ic-timer.png";

const GroupBx = (props) => {
  const { roomLock, bgcolor, onClick } = props;
  const userlist = props.peopleInRoom;
  // const _private = props.private

  const [purpose, setPurpose] = React.useState("");
  const [started, setStarted] = React.useState(props.isStarted);
  React.useEffect(() => {
    if (props.purpose === 0) {
      setPurpose("자율학습");
    } else if (props.purpose === 1) {
      setPurpose("시험공부");
    } else if (props.purpose === 2) {
      setPurpose("수능공부");
    } else if (props.purpose === 3) {
      setPurpose("자격증");
    } else if (props.purpose === 4) {
      setPurpose("공무원");
    } else if (props.purpose === 5) {
      setPurpose("기타");
    }

    if (props.isStarted === 0) {
      // console.log("쉬는시간")
      setStarted(0);
    } else {
      // console.log("공부시간")
      setStarted(1);
    }
  }, [props.purpose, props.isStarted]);

  return (
    <GroupCont className={bgcolor} private={props.private}>
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
                    <span className="state_name_circle"></span>
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
      <RoomTimeInfo>
        {props.studyTime}분 / {props.recessTime}분
      </RoomTimeInfo>

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

const RoomTimeInfo = styled.div`
  position: absolute;
  bottom: 0.5vw;
  right: 4vw;
  font-size: 0.8vw;
`;
const GroupCont = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 1vw 1vw 0.5vw;
  width: 17.1vw;
  height: 10vw;
  border-radius: 0.7vw;
  background-color: #eee;
  box-sizing: border-box;
  overflow: hidden;
`;

export default GroupBx;
