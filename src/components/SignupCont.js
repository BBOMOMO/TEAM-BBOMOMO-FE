import React from "react";
import styled from "styled-components";
import { Button, Input, Select } from "../elements";
import {useDispatch} from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const SingupCont = (props) => {

  const dispatch = useDispatch();

  //회원가입 목록
  const [name, setName] = React.useState('');
  const [nickname, setNickname] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const [pwdck, setPwdck] = React.useState('');
  const [category, setCategory] = React.useState('0');

  //유효성 검사

  const [isPwd, setIsPwd] = React.useState('false');
  const [samePwd, setSamePwd] = React.useState('false');

  const onChangePwd = (e) => {
    const pwdRegex =  /^[a-zA-Z0-9]{6,12}$/;
    const pwdcurrent = e.target.value;
    setPwd(pwdcurrent);
    console.log(pwdcurrent)

    if(!pwdRegex.test(pwdcurrent)){
      setIsPwd(false)
    }else{
      setIsPwd(true)
    }

  }

  const checkPwd = (e) => {
    const pwdcurrent2 = e.target.value;
    setPwdck(pwdcurrent2);
    console.log(pwdcurrent2)
    if(pwdcurrent2===pwd){
      setSamePwd(true)
    }else{
      setSamePwd(false)
    }
  }

  const signup = () => {
    if(isPwd === true && samePwd === true){
      console.log(name, nickname, pwd, pwdck, category)
      dispatch(userActions.registerSQL(name, pwd,pwdck,nickname,category));
    }
    
  }

  return (
    <div className="signup_container_wrap">
      <div className="signup_container">
        <h1 className="signup_title">
          뽀모모와 함께 할 계정을 만들어주세요
        </h1>
        <div className="singup_content">
          <Input text="아이디"  boxSizing border="none" display="block" color="#7A7D81" margin="18px 0 " width="498px"
            value={name}  _onChange={(e)=>{setName(e.target.value)}} />
          <Input text="닉네임" boxSizing border="none" display="block" color="#7A7D81" margin="18px 0" width="498px"
            value={nickname} _onChange={(e)=>{setNickname(e.target.value)}} />
         
          <InputWrap>
            <Input  type="password" text="비밀번호" boxSizing display="block" color="#7A7D81" margin="18px 0 0 0" width="498px"
              value={pwd} _onChange={onChangePwd} className={isPwd && pwd.length? "green": "red"} />
             <span className={isPwd && pwd.length? "green": "red"}>
              {isPwd && pwd.length? '사용 가능한 비밀번호입니다': '영문,숫자, 6-12자로 구성된 비밀번호를 입력해 주세요.'}
             </span>
          </InputWrap>
         

         
          <Select text="구분" boxSizing border="none" display="block" color="#7A7D81" margin="18px 0 " width="498px" 
          name="category" _onChange={(e)=>{
            const selectedCate = e.target.value;
            setCategory(selectedCate);
          }} >
            <option key="middle1" value="0"> 중1 </option>
            <option key="middle2" value="1"> 중2 </option>
            <option key="middle3" value="2"> 중3 </option>
            <option key="high1" value="3"> 고1 </option>
            <option key="high2" value="4"> 고2 </option>
            <option key="high3" value="5"> 고3 </option>
            <option key="univ" value="6"> 대학생 </option>
          </Select>
          
          <InputWrap>
            <Input type="password" text="비밀번호 확인" boxSizing border="none" display="block" color="#7A7D81" margin="18px 0 0" width="498px"
              value={pwdck} _onChange={checkPwd} className={samePwd && pwdck.length? "green": "red"} />
            <span className={samePwd && pwdck.length? "green": "red"}>
              {samePwd && pwdck.length? '비밀번호가 일치합니다.': '일치하지 않는 비밀번호 입니다.'}
            </span>
          </InputWrap>

          <Button border="none"  width="100%" height="70px" radius="11px" margin="148px 0 0 0" weight="600" _onClick={signup}>
            계정 만들기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SingupCont;

const InputWrap = styled.div`
position: relative;
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
  border:2px solid #FD5414!important;
}

`;
