import React from "react";
import styled from "styled-components";
import { Button, Input, Select } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import _ from "lodash";

const SignupCont = (props) => {
  const dispatch = useDispatch();

  //회원가입 목록
  const [name, setName] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwdck, setPwdck] = React.useState("");
  const [category, setCategory] = React.useState("0");

  //유효성 검사
  const [isId, setIsId] = React.useState("false");
  const [isNick, setIsNick] = React.useState("false");
  const [isPwd, setIsPwd] = React.useState("false");
  const [samePwd, setSamePwd] = React.useState("false");

  //중복검사

  const _idCheck = useSelector((state) => state.user.idCk);
  const _nickCheck = useSelector((state) => state.user.nickCk);
  // 주의 : 아이디, 닉네임 체크 true,false 값은 string으로 넘어옴.
  // console.log("값 넘어오나",_idCheck, _nickCheck);



  //아이디 정규식
  const onChangeId = (e) => {
 
    setName(e.target.value);
    console.log(e.target.value)
    let userIdRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{3,20}$/;
    let idRegex = userIdRegex.test(e.target.value);
    console.log("아디체인지",_idCheck,isId)
    if (!idRegex) {
      setIsId(false);
    } else {
      setIsId(true);
    }
    if(_idCheck == true && setName!== setName){
      _idCheck = false;
    }

  };
  //닉네임 정규식
 
  const onChangeNick = (e) => {

    setNickname(e.target.value);
    let userNickRegex = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{3,20}$/;
    let NickRegex = userNickRegex.test(e.target.value);
    console.log(NickRegex);
    if (!NickRegex) {
      setIsNick(false);
    } else {
      setIsNick(true);
    }
 

  };
  console.log("_idCheck",_idCheck)
  const onChangePwd = (e) => {
    const pwdRegex = /^[a-zA-Z0-9]{6,12}$/;
    const pwdcurrent = e.target.value;
    setPwd(pwdcurrent);
    //console.log(pwdcurrent)

    if (!pwdRegex.test(pwdcurrent)) {
      setIsPwd(false);
    } else {
      setIsPwd(true);
    }
  };

  const checkPwd = (e) => {
    const pwdcurrent2 = e.target.value;
    setPwdck(pwdcurrent2);
    console.log(pwdcurrent2);
    if (pwdcurrent2 === pwd) {
      setSamePwd(true);
    } else {
      setSamePwd(false);
    }
  };

  const idCheck = () => {
    // 아이디 중복체크
    
    dispatch(userActions.idCheckDB(name));
    
  };
  const nickCheck = () => {
    // 닉네임 중복체크
    dispatch(userActions.nickCheckDB(nickname));
  };

  const signup = () => {
    if (
      isPwd === true &&
      samePwd === true &&
      _idCheck === "true" &&
      _nickCheck === "true"
    ) {
      console.log(name, nickname, pwd, pwdck, category);
      dispatch(userActions.registerDB(name, pwd, pwdck, nickname, category));
    } else {
      window.alert("모든 조건이 맞는지 확인해주세요.");
    }
  };

  return (
    <div className="signup_container_wrap">
      <div className="signup_container">
        <h1 className="signup_title">뽀모모와 함께 할 계정을 만들어주세요</h1>
        <div className="signup_content">
          <InputWrap className="signup_inputWrap">
            <Input
              text="아이디"
              boxSizing
              border="none"
              display="block"
              color="#7A7D81"
              margin="18px 0 "
              width="498px"
              placeholder="영문과 숫자를 포함한 3~12자를 입력하세요."
              maxlength={20}
              value={name}
              _onChange={onChangeId}
              className={isId === "false" ? "" : _idCheck === "true" && isId === true ? "green" : "red"}
            />
            <button onClick={idCheck}>중복확인</button>
            <span
              className={isId === "false" ? "" : _idCheck === "true" && isId === true ? "green" : "red"}
            >
              {isId === "false" ? "" : _idCheck === "true" && isId === true
                ? "사용 가능한 아이디입니다"
                : "중복확인을 해주세요."}
            </span>
          </InputWrap>

          <InputWrap className="signup_inputWrap">
            <Input
              text="닉네임"
              boxSizing
              border="none"
              display="block"
              color="#7A7D81"
              margin="18px 0"
              width="498px"
              placeholder="3글자 이상의 닉네임을 입력하세요."
              maxlength={20}
              value={nickname}
              _onChange={onChangeNick}
              className={isNick === "false" ? "" : _nickCheck === "true" && isNick ? "green" : "red"}
            />
            <button onClick={nickCheck}>중복확인</button>
            <span className={isNick === "false" ? "" : _nickCheck === "true" && isNick ? "green" : "red"}>
              {isNick === "false" ? "" : _nickCheck === "true" && isNick
                ? "사용 가능한 닉네임입니다"
                : "중복확인을 해주세요."}
            </span>
          </InputWrap>

          <InputWrap>
            <Input
              type="password"
              text="비밀번호"
              boxSizing
              display="block"
              color="#7A7D81"
              margin="18px 0 0 0"
              width="498px"
              value={pwd}
              _onChange={onChangePwd}
              className={pwd.length===0 ? "" : isPwd && pwd.length ? "green" : "red"}
            />
            <span className={pwd.length===0 ? "" : isPwd && pwd.length ? "green" : "red"}>
              { isPwd && pwd.length
                ? "사용 가능한 비밀번호입니다"
                : "영문,숫자, 6-12자로 구성된 비밀번호를 입력해 주세요."}
            </span>
          </InputWrap>

          <Select
            text="구분"
            boxSizing
            border="none"
            display="block"
            color="#7A7D81"
            margin="18px 0 "
            width="498px"
            name="category"
            _onChange={(e) => {
              const selectedCate = e.target.value;
              setCategory(selectedCate);
            }}
          >
            <option name="middle1" value="1">
              {" "}
              중1{" "}
            </option>
            <option name="middle2" value="2">
              {" "}
              중2{" "}
            </option>
            <option name="middle3" value="3">
              {" "}
              중3{" "}
            </option>
            <option name="high1" value="4">
              {" "}
              고1{" "}
            </option>
            <option name="high2" value="5">
              {" "}
              고2{" "}
            </option>
            <option name="high3" value="6">
              {" "}
              고3{" "}
            </option>
            <option name="univ" value="7">
              {" "}
              대학생{" "}
            </option>
            <option name="univ" value="8">
              {" "}
              직장인{" "}
            </option>
          </Select>

          <InputWrap>
            <Input
              type="password"
              text="비밀번호 확인"
              boxSizing
              border="none"
              display="block"
              color="#7A7D81"
              margin="18px 0 0"
              width="498px"
              value={pwdck}
              _onChange={checkPwd}
              onSubmit={signup}
              className={pwdck.length===0 ? "" : samePwd && pwdck.length ? "green" : "red"}
            />
            <span className={pwdck.length===0 ? "" : samePwd && pwdck.length ? "green" : "red"}>
              {samePwd && pwdck.length
                ? "비밀번호가 일치합니다."
                : "일치하지 않는 비밀번호 입니다."}
            </span>
          </InputWrap>

          <Button
            border="none"
            width="100%"
            height="70px"
            radius="11px"
            margin="148px 0 0 0"
            weight="600"
            _onClick={signup}
          >
            계정 만들기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignupCont;

const InputWrap = styled.div`
  position: relative;
  > span {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 12px;
  }

  > span.green {
    color: #00a106;
  }

  > span.red {
    color: #fd5414;
  }

  > label > input.green {
    border: 2px solid #00a106 !important;
  }
  > label > input.red {
    border: 2px solid #fd5414 !important;
  }
`;
