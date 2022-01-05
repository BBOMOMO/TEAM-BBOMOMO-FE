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
    size,
  } = props;

  const labelStyle = { display, color, size };
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
    color,
    size,
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
  border: "none",
  size: "18px",
  color: "#c6c6c6",
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
  outline: none;
`;

const ElLabel = styled.label`
  font-weight: normal;
  ${(props) => (props.color ? `color: ${props.color};` : "")}
  ${(props) => (props.size ? `font-size: ${props.size};` : "")}
`;

const ElInput = styled.input`
  ${(props) => (props.width ? `width: ${props.width};` : "")};
  ${(props) => (props.height ? `height: ${props.height};` : "")};
  ${(props) => (props.radius ? `border-radius: ${props.radius};` : "")};
  ${(props) => (props.height ? `height: ${props.height};` : "")};
  ${(props) => (props.size ? `font-size: ${props.size};` : "")};
  background-color: #f4f4f4;

  outline: none;
  ${(props) => (props.boxSizing ? `box-sizing: border-box;` : "")};
  ${(props) => (props.border ? `border: ${props.border};` : "")};
  ${(props) => (props.display ? `display: ${props.display};` : "")};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")};
  ${(props) => (props.color ? `color: ${props.color};` : "")};
`;

export default Input;
