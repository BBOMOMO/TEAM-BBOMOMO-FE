import React, { useState } from "react";
import { Button, Input } from "../elements";
import person from "../Images/ic-people.png";
import lock from "../Images/ic-lock-alt.png";
import googlelogo from "../Images/googlelogo.png";
import kakaologo from "../Images/kakaologo.png";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";

const LoginCont = (props) => {
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  return (
    <div className="login_container">
      <div className="login_left_bx"></div>

      <div className="login_rigth_bx">
        <div className="login_inner_bx">
          <h2 className="login_h2">
            뽀모모와
            <br />
            함께 공부를 시작해볼까요?
          </h2>

          <div className="mb20 login_input_id">
            <img src={person} alt="사람 아이콘" />
            <Input
              value={id}
              text="아이디"
              boxSizing
              height="62px"
              radius="11px"
              border="none"
              color="#7A7D81"
              margin="16px 0 0 0"
              padding="0 0 0 60px"
              _onChange={(e) => {
                setId(e.target.value);
                console.log(id);
              }}
            ></Input>
          </div>

          <div className="login_input_pw">
            <img src={lock} alt="자물쇠 아이콘" />
            <Input
              value={pw}
              text="비밀번호"
              boxSizing
              height="62px"
              radius="11px"
              border="none"
              display="block"
              color="#7A7D81"
              margin="16px 0 0 0"
              padding="0 0 0 60px"
              _onChange={(e) => {
                setPw(e.target.value);
                console.log(pw);
              }}
            ></Input>
          </div>

          <Button
            border="none"
            height="70px"
            radius="11px"
            margin="40px 0 40px 0"
            weight="600"
            _onClick={() => {
              dispatch(userActions.loginDB(id, pw));
              dispatch(userActions.checkUserDB());
            }}
          >
            로그인
          </Button>

          <div className="login_guideline">또는</div>

          <div className="login_btn_bx">
            <button className="login_btn login_google">
              <img src={googlelogo} alt="구글 로고" />
              <span className="ml20">구글 로그인</span>
            </button>

            <button className="login_btn login_kakao">
              <img src={kakaologo} alt="카카오 로고" />
              <span className="ml20">카카오 로그인</span>
            </button>
          </div>

          <div className="login_goto_signup_bx">
            <p>
              아직 회원이 아니신가요?
              <button
                className="ml20 pb5 login_goto_signup"
                onClick={() => {
                  history.push("/signup");
                }}
              >
                회원가입
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCont;
