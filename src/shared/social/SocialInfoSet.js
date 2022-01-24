import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as roomActions } from "../../redux/modules/group";
import { actionCreators as userActions } from "../../redux/modules/user";
import styled from "styled-components";
import { history } from "../../redux/configureStore";
//import Close from "../Images/ic_header_close.png";
import Input from "../../elements/Input";
import Select from "../../elements/Select";

const SocialInfoSet = (props) => {
  const dispatch = useDispatch();
  const _nickCheck = useSelector((state) => state.user.nickCk);
  const [valueName, setValue] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const [category, setCategory] = React.useState("1");
    
  const nickCheck = () => {
    //TODO : 닉네임 중복확인
    dispatch(userActions.nickCheckDB(nickname));
  }

  return (
    <>
      <SocialInfoContainer>
        <SocialInfoModalDim></SocialInfoModalDim>
        <SocialInfoModal>
          <SocialInfoModalTop>
            <p className="privateModal_top_title">닉네임과 상태명을 설정해 주세요</p>
            {/* <img
              src={Close}
              alt="닫기"
              className="privateModal_top_close"
              onClick={() => {
                dispatch(roomActions.privateState(false));
              }}
            /> */}
          </SocialInfoModalTop>
          <NickEdit>
            
            <Input text="닉네임" boxSizing border="none" display="block" height="3vw" size="0.8vw" color="#7A7D81" margin="0.8vw 0" 
              placeholder="3글자 이상의 닉네임을 입력하세요." maxlength={15} value={nickname} 
              _onChange={(e)=>{setNickname(e.target.value)}} 
              className={_nickCheck== null ? '' : _nickCheck==='true' && nickname.length>2 ? "green": "red"}/>
              <button onClick={nickCheck}>중복확인</button>
              <span className={_nickCheck== null ? '' : _nickCheck==='true' && nickname.length>2 ? "green": "red"}>
                {_nickCheck===null ?"": _nickCheck==="true" && nickname.length>2  ? '사용가능한 닉네임입니다.':'다시 중복확인 해주세요.'}
              </span>
              
          </NickEdit>
          <SocialInfoModalMid>
           
            <Input
              text="목표를 입력해주세요"
              boxSizing
              value={valueName}
              _onChange={(e) => setValue(e.target.value)}
              placeholder="동기부여를 위해 목표를 입력해주세요"
              height="3vw"
              color="#7A7D81" margin="0.8vw 0"
              size="0.8vw"
              radius="0.6vw"
            />
          </SocialInfoModalMid>
          <div className="division_edit selectbox_wrap" >
            <Select text="구분" boxSizing border="none" display="block" size="0.8vw" color="#7A7D81" margin="0.8vw 0 "
              width="100%" height="3vw" top="3.2vw" padding="0 10px" name="category" value={category} _onChange={(e)=>{
              setCategory(e.target.value);
            }} >
              <option name="middle1" value="1"> 중1 </option>
              <option name="middle2" value="2" > 중2 </option>
              <option name="middle3" value="3" > 중3 </option>
              <option name="high1" value="4"> 고1 </option>
              <option name="high2" value="5" > 고2 </option>
              <option name="high3" value="6" > 고3 </option>
              <option name="univ" value="7" > 대학생 </option>
              <option name="worker" value="8"> 직장인 </option>
              <option name="worker" value="9"> 취준생 </option>
            </Select>
          </div>
          
          <SocialInfoModalBot>
            <p
              
              className = {valueName!==null && _nickCheck==="true" && nickname.length>2  ? "privateModal_bot_btn activeBtn" : "privateModal_bot_btn"}
              onClick={() => {     
                dispatch(userActions.changeInfo(nickname,category));
                dispatch(userActions.statMsgDB(valueName));
                history.push("/");
              }}
            >
              입장하기
            </p>
          </SocialInfoModalBot>
        </SocialInfoModal>
        
      </SocialInfoContainer>
    </>
  );
};
const SocialInfoContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  height: 100vh;
  width: 100vw;
`;
const SocialInfoModalDim = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: 54%;
`;
const SocialInfoModal = styled.div`
  width: 28.54vw;
  background: #fff;
  border-radius: 16px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0.2vw 1.29vw 1.5vw 1.29vw;
  box-sizing: border-box;

  .selectbox_wrap{
    margin-top:0;
  }

`;
const SocialInfoModalTop = styled.div`
  width: 100%;
  height: 7.68vh;
  border-bottom: 1px solid #e7e7e7;
  position: relative;
  .privateModal_top_title {
    font-size: 1.84vh;
    font-weight: 600;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
  .privateModal_top_close {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    height: 2.46vh;
    width: 1.25vw;
  }
`;
const SocialInfoModalMid = styled.div`
  width: 100%;
  .privateModal_mid_password {
    margin: 3.69vh 0 0.82vh 0.73vw;
    font-size: 1.43vh;
  }
`;
const SocialInfoModalBot = styled.div`
  width: 100%;
  padding-top: 0.5vw;
 
  .privateModal_bot_btn {
    width: 100%;
    height: 5.53vh;
    background: #889cf2;
    border-radius: 11px;
    color: #fff;
    font-size: 1.84vh;
    font-weight: 600;
    text-align: center;
    line-height: 5.53vh;
    opacity:0.5;
  }

  .activeBtn{
    opacity:1!important;
  }

 
`;
const NickEdit = styled.div`
  position:relative;
  margin-top:1vw;
  >button {
    position:absolute;
    top:2.6vw;
    right:0.8vw;
    border:none;
    background-color:#889cf2;
    color:#fff;
    font-size:0.7vw;
    padding:6px 20px;
    border-radius:20px;
    cursor:pointer;
  }

  >span {
  position: absolute;
  right:0;
  top:0;
  font-size:0.7vw; 
}


>span.green {
  color: #00a106;
}

>span.red {
  color:#FD5414;
  
}

>label>input.green{
  border:2px solid #00a106!important;
}
>label>input.red{
  border:2px solid #FD5414!important;opacity:0.5;
}
`;
export default SocialInfoSet;
