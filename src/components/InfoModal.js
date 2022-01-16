import React from "react";
import styled from "styled-components";
import close from "../Images/ic_header_close.png";
import Input from "../elements/Input";
import Select from "../elements/Select";
import { delToken,delCookie } from "../shared/token";
import {useSelector, useDispatch} from "react-redux";
import {history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";


function InfoModal({ showModal, closeModal }) {
  const dispatch = useDispatch();
  const userCate = useSelector((state) => state.user.userCate);
  const userId = useSelector((state) => state.user.userId);
  const userNick = useSelector((state) => state.user.userNick);

  const [nickname, setNickname] = React.useState(userNick);
  const [category, setCategory] = React.useState(1);
  


  const _nickCheck = useSelector((state) => state.user.nickCk);
  //TODO : 닉네임, 구분 정보 가져와서 기본값으로 넣어주기


  //selected 기존 값으로 seleced 로 고정


  //console.log("category",category,userCate);
  //console.log(_nickCheck )
  React.useEffect(()=>{ 
    
  },[]);

  
  //console.log("user",userId)
  //TODO : 닉네임 중복확인되면 색상없음, 틀렸을때만 빨간색으로 

  //닉네임 중복검사 true/false
  //console.log(_nickCheck);

  
  const nickCheck = () => {
    //TODO : 닉네임 중복확인
    dispatch(userActions.nickCheckDB(nickname));


  }
  const profileUpdate = () => {
    //TODO : 수정완료
    //console.log(nickname, category);
    dispatch(userActions.changeInfo(nickname,category));
    closeModal();
  }

  //로그아웃버튼
  const logout = () => {
   
    dispatch(userActions.logout());
    delCookie("login");
   
  }

  return (
    <>
      {showModal ? (
        <div className="header_modal_container info_modal">
          <p className="header_modal_title">개인 정보 수정</p>
          <span className="group_modal_close" onClick={closeModal}>
            <img src={close} alt="" />
          </span>
          <div className="header_modal_hr"></div>

          <div>
            <div className="personal_info_edit">
              <div className="nickname_edit">
                <NickEdit>
                <Input text="닉네임" boxSizing border="none" display="block" height="51px" size="16px" color="#7A7D81" margin="18px 0" 
                  placeholder={userNick} maxlength={15} value={nickname} 
                  _onChange={(e)=>{setNickname(e.target.value)}} 
                  className={_nickCheck== null ? '' : _nickCheck==='true' && nickname.length>2 ? "green": "red"}/>
                  <button onClick={nickCheck}>중복확인</button>
                  <span className={_nickCheck== null ? '' : _nickCheck==='true' && nickname.length>2 ? "green": "red"}>
                    {_nickCheck===null ?'닉네임 사용중': _nickCheck==="true" && nickname.length>2  ? '사용가능한 닉네임입니다.':'사용중인 닉네임입니다. '}
                    

                  </span>
                  
                </NickEdit>
              </div>
              <div className="division_edit">
              <Select text="구분" boxSizing border="none" display="block" color="#7A7D81" margin="18px 0 "
                width="100%" height="51px" top="58px" padding="0 10px" name="category" value={category} _onChange={(e)=>{
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
              </Select>
              </div>

              <EditBtn onClick={profileUpdate} className>
              수정완료
              </EditBtn>
            </div>
            
            
            
            <div className="header_modal_hr mt0"></div>
            <div className="userservice">
              <p className="userservice_btn">계정 설정</p>
              <p className="userservice_btn">문의 하기</p>
            </div>
            <div className="logout clearfix">
              <p className="logout_btn fr" onClick={logout}>로그아웃</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default InfoModal;

const EditBtn = styled.button`
  width:100%;
  background-color:#889CF2;
  color:#fff;
  font-size:18px;
  font-weight:500;
  text-align:center;
  height:52px;
  line-height:52px;
  border-radius: 11px;
  border:none;
  outline:none;
  margin-top:15px; 
  cursor:pointer;
`;

const NickEdit = styled.div`
  position:relative;

  >button {
    position:absolute;
    top:47px;
    right:18px;
    border:none;
    background-color:#889cf2;
    color:#fff;
    font-size:12px;
    padding:6px 20px;
    border-radius:20px;
    cursor:pointer;
  }

  >span {
  position: absolute;
  right:0;
  top:0;
  font-size:12px; 
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
