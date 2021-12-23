import React from "react";
import styled from "styled-components";

const Input = (props) => {
  const { text, children } = props;
  const styles = {};
  return (
    <ElLabel>
      {text}
      <ElInput>{children}</ElInput>
    </ElLabel>
  );
};

const ElLabel = styled.label`
  font-size: 20px;
  font-weight: normal;
`;

const ElInput = styled.input`
  width: 498px;
  height: 62px;
  border-radius: 11px;
  font-size: 24px;
  padding-left: 21px;
  background-color: #f4f4f4;
`;

export default Input;
