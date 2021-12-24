import React from 'react';
import styled from 'styled-components';
import CreateGroup from '../components/CreateGroup';
import Modal from '../components/Modal';

function GroupList() {

  const [showModal, setShowModal] = React.useState(false);

//클릭 시 모달창 열기
  const openModal = () => {
    setShowModal(true);
  }


  return (
    <>
      <button onClick={openModal}>모달창</button>
            <Modal/>

    </>

      
   
  )
}


export default GroupList;
