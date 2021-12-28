import React from "react";
import flag from "../Images/ic-flag.png";

const GroupRoomTimer = () => {
  return (
    <div className="timer_bx">
      <h2>집!중!시!간!</h2>
      <div className="timer_time_bx">
        <div className="timer_time">00:00:00</div>
        <div className="timer-time_round">
          <p>1/4 라운드</p>
        </div>
      </div>
      <div className="timer_bar_bx">
        <div className="timer_inner_bar">
          <img src={flag} alt="깃발 아이콘" />
        </div>
      </div>
    </div>
  );
};

export default GroupRoomTimer;
