import React, {useState} from "react";
import {Button, Input} from "../Elements";

const LoginCont = () => {
  const [id, setId] = useState("");
  return (
    <div className="login_container">
      <div className="login_left_bx">
        <img
          style={{
            width: "100%",
          }}
          src={require("../Images/loginbg.png").default}
          alt=""
        />
      </div>

      <div className="login_rigth_bx">
        <div className="login_inner_bx">
          <h2 className="login_h2">
            뽀모모와
            <br />
            함께 공부를 시작해볼까요?
          </h2>

          <div className="mb20 login_input_id">
            <img
              src={require("../Images/ic-people.png").default}
              alt="사람 아이콘"
            />
            <Input
              value={id}
              text="아이디"
              boxSizing
              border="none"
              color="#7A7D81"
              margin="16px 0 0 0"
              padding="0 0 0 60px"
              _onchange={(e) => {
                setId(e.target.value);
                console.log(123);
              }}
            ></Input>
          </div>

          <div className="login_input_pw">
            <img
              src={require("../Images/ic-lock-alt (1).png").default}
              alt="사람 아이콘"
            />
            <Input
              text="비밀번호"
              boxSizing
              border="none"
              display="block"
              color="#7A7D81"
              margin="16px 0 0 0"
              placeholder=""
            ></Input>
          </div>

          <Button
            border="none"
            height="70px"
            radius="11px"
            margin="40px 0 40px 0"
            weight="600"
          >
            로그인
          </Button>

          <div className="login_guideline">또는</div>

          <div className="login_btn_bx">
            <button className="login_btn login_google">
              <img
                src={require("../Images/googlelogo.png").default}
                alt="구글 로고"
              />
              <span className="ml20">구글 로그인</span>
            </button>

            <button className="login_btn login_kakao">
              <img
                src={require("../Images/kakaologo.png").default}
                alt="카카오 로고"
              />
              <span className="ml20">카카오 로그인</span>
            </button>
          </div>

          <div className="login_goto_signup_bx">
            <p>
              아직 회원이 아니신가요?
              <button className="ml20 pb5 login_goto_signup">회원가입</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCont;
