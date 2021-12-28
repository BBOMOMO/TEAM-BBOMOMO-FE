import React from 'react';
import styled from 'styled-components';
import CreateGroup from '../components/CreateGroup';


function GroupList() {

  const [showModalCG, setShowModalCG] = React.useState(false);

//클릭 시 모달창 열기
  const openModal = () => {
    setShowModalCG(true);
  }
  const closeModal = () => {
    setShowModalCG(false);
  }


  return (
    <>
      <button onClick={openModal}>+그룹만들기 </button>
      <CreateGroup showModal={showModalCG} closeModal={closeModal} />
      

    </>

      
   
  )
}


export default GroupList;
