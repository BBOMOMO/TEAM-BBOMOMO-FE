import React from "react";
import styled from "styled-components";
import Input from "../elements/Input";
import Button from "../elements/Button";
import Select from "../elements/Select";

const SingupCont = (props) => {
  return (
    <div>
      <div className="signup_container">
        <h1 className="signup_title">
          뽀모도로(네임명)와
          <br />
          함께 할 계정을 만들어주세요
        </h1>
        <div className="singup_content">
          <Input
            text="아이디"
            boxSizing
            border="none"
            display="block"
            color="#7A7D81"
            margin="18px 0 0 0"
            width="498px"
          ></Input>
          <Input
            text="닉네임"
            boxSizing
            border="none"
            display="block"
            color="#7A7D81"
            margin="18px 0 0 0"
            width="498px"
          ></Input>
          <Input
            text="비밀번호"
            boxSizing
            border="none"
            display="block"
            color="#7A7D81"
            margin="18px 0 0 0"
            width="498px"
          ></Input>
          <Select
            text="구분"
            boxSizing
            border="none"
            display="block"
            color="#7A7D81"
            margin="18px 0 0 0"
            width="498px"
          ></Select>
          <Input
            text="비밀번호확인"
            boxSizing
            border="none"
            display="block"
            color="#7A7D81"
            margin="18px 0 0 0"
            width="498px"
          ></Input>
          <Button
            border="none"
            width="100%"
            height="70px"
            radius="11px"
            margin="148px 0 0 0"
            weight="600"
          >
            계정 만들기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SingupCont;
