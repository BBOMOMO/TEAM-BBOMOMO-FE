import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as groupAction } from "../redux/modules/group";

import modal1 from "../Images/modal1.png";
import modal2 from "../Images/modal2.png";
import close from "../Images/header_close.png";
const VideoModal = (props) => {
  const dispatch = useDispatch();
  const round = useSelector((state) => state.group.round);
  // const closeBtn = () => {
  //   dispatch(groupAction.groupModal(false));
  // };

  return (
    <div className="video_modal">
      <img
        className="video_modal_close_btn"
        src={close}
        alt="닫기"
        onClick={() => {
          dispatch(groupAction.groupModal(false));
        }}
      />
      <p className="video_modal_fighting">
        열심히 공부한 자 쉬는 시간을 즐겨라!
      </p>
      <p className="video_modal_round">라운드 {round} 종료!</p>
      <img className="video_modal_img" src={modal1} alt="뽀모모" />
    </div>
  );
};

export default VideoModal;
