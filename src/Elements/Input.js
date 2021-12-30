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
    padding,
    className,
    createGroup,
    radius,
    height,
    checkbox,
    _name,
    _checked,
  } = props;

  const labelStyle = { display, color };
  const styles = {
    boxSizing,
    border,
    display,
    margin,
    width,
    height,
    padding,
    className,
    radius,
  };

  if (createGroup) {
    return (
      <GroupLabel {...labelStyle}>
        {text}
        <GroupInput
          type={type}
          placeholder={placeholder}
          onChange={_onChange}
          value={value}
          {...styles}
        />
      </GroupLabel>
    );
  }

  if (checkbox) {
    return (
      <CheckboxLabel {...labelStyle}>
        <CheckInput
          type="radio"
          name={_name}
          placeholder={placeholder}
          onChange={_onChange}
          value={value}
          {...styles}
        />
        <span>{text}</span>
      </CheckboxLabel>
    );
  }

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
  height: "62px",
  radius: "11px",
};

const CheckboxLabel = styled.label`
  > span {
    display: inline-block;
    padding: 15px 20px;
    background-color: #f4f4f4;
    border-radius: 11px;
    margin: 0 15px 16px 0;
    cursor: pointer;
  }
`;

const CheckInput = styled.input`
  display: none;
  :checked + span {
    background-color: #d8d8d8;
    font-weight: bold;
  }
`;

const GroupLabel = styled.label`
  font-size: 16px;
  font-weight: normal;
`;

const GroupInput = styled.input`
  width: 100%;
  height: 44px;
  border-radius: 11px;
  background-color: #f4f4f4;
  color: #c6c6c6;
  border: none;
  margin: 16px 0 0 0;
  padding-left: 21px;
  box-sizing: border-box;
  font-size: 16px;
`;

const ElLabel = styled.label`
  font-size: 18px;
  font-weight: normal;
  ${(props) => (props.color ? `color: ${props.color};` : "")}
`;

const ElInput = styled.input`
  ${(props) => (props.width ? `width: ${props.width};` : "")}
  ${(props) => (props.height ? `height: ${props.height};` : "")}
  ${(props) => (props.radius ? `border-radius: ${props.radius};` : "")}
  ${(props) => (props.height ? `height: ${props.height};` : "")}
  font-size: 18px;
  color: #c6c6c6;
  background-color: #f4f4f4;
  outline: none;
  border: none;
  margin: 16px 0 0 0;
  ${(props) => (props.boxSizing ? `box-sizing: border-box;` : "")}
  ${(props) => (props.border ? `border: ${props.border};` : "")}
  ${(props) => (props.display ? `display: ${props.display};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
`;

export default Input;
