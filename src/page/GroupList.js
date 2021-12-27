import React from "react";
import styled from "styled-components";
import CreateGroup from "../components/CreateGroup";
import Modal from "../components/Modal";
import GroupBx from "../components/GroupBx";

function GroupList() {
  const [showModal, setShowModal] = React.useState(false);

  //클릭 시 모달창 열기
  const openModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <button onClick={openModal}>모달창</button>
      <Modal />
      <GroupBx></GroupBx>
    </>
  );
}

export default GroupList;
