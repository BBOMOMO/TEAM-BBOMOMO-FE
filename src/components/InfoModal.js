import React from 'react';
import styled from 'styled-components';
import close from "../Images/ic_header_close.png";

function InfoModal({showModal,closeModal}) {
  return (
    <>
    { showModal ? 
      <div className="header_modal_container info_modal">
        <p className="header_modal_title">개인 정보 수정</p>
        <span className="group_modal_close" onClick={closeModal}>
            <img src={close} alt="" />
          </span>
        <div className="header_modal_hr"></div>

        <div>
          <div className=""></div>
        </div>
      </div>
    :null}
      
    </>
  )
}

export default InfoModal;




