import React from "react";
import styled from "styled-components";

const Input = (props) => {
  const {
    text,
    placeholder,
    type,
    _onChange,
    value,
    boxSizing,
    border,
    display,
    color,
    margin,
    width,
  } = props;
  const labelStyle = { display, color };
  const styles = { boxSizing, border, display, margin, width };


  return (
    <ElLabel {...labelStyle}>
      {text}
      <ElInput
        type={type}
        placeholder={placeholder}
        onChange={_onChange}
        value={value}
        {...styles}
      />
    </ElLabel>
  );
};

Input.defaultProps = {
  label: "",
  placeholder: "",
  type: "text",
  value: "",
  padding: "10px",
  boxSizing: "border-box",
  _onChange: () => {},
  width: "100%",
};

const ElLabel = styled.label`
  font-size: 18px;
  font-weight: normal;
  ${(props) => (props.color ? `color: ${props.color};` : "")}
`;

const ElInput = styled.input`
  ${(props) => (props.width ? `width: ${props.width};` : "")}
  height: 62px;
  border-radius: 11px;
  font-size: 18px;
  color: #c6c6c6;
  padding-left: 21px;
  background-color: #f4f4f4;
  outline: none;
  ${(props) => (props.boxSizing ? `box-sizing: border-box;` : "")}
  ${(props) => (props.border ? `border: ${props.border};` : "")}
  ${(props) => (props.display ? `display: ${props.display};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
`;

export default Input;
