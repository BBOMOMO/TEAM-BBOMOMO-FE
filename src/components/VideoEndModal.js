import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as groupAction } from "../redux/modules/group";

import closeModal from "../Images/groupCloseModal.png";
import close from "../Images/header_close.png";

const VideoEndModal = (props) => {
  const dispatch = useDispatch();
  const round = useSelector((state) => state.group.round);
  // const closeBtn = () => {
  //   dispatch(groupAction.groupModal(false));
  // };

  return (
    <div className="video_modal_container">
      <div className="video_modal_dim"></div>
      <img
        className="video_modal_close_btn"
        src={close}
        alt="닫기"
        onClick={() => {
          dispatch(groupAction.groupEndModal(false));
        }}
      />
      <p className="video_modal_ending font600 tc">
        지금 공부를 그만두면
        <br />
        공부시간이 저장되지 않습니다.
        <br />
        정말 종료하시겠어요?
      </p>
      <img className="video_close_modal_img" src={closeModal} alt="뽀모모" />
      <p className="video_end_study" onClick={props.endBtn}>
        공부 끝내기
      </p>
    </div>
  );
};

export default VideoEndModal;
