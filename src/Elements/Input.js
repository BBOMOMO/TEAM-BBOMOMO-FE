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
    maxlength,
    onSubmit,
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
    maxlength,
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
        maxLength={maxlength}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onSubmit(e);
          }
        }}
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
  padding: "10px 20px",
  boxSizing: "border-box",
  _onChange: () => {},
  onSubmit: () => {},
  width: "100%",
  height: "6.35vh",
  radius: "11px",
  border: "none",
  size: "1vw",
  color: "#7A7D81",
};

const CheckboxLabel = styled.label`
  > span {
    display: inline-block;
    padding: 15px 20px;
    background-color: #f4f4f4;
    border-radius: 11px;
    margin: 0 0.8vw 0.9vw 0;
    font-size:0.9vw;
    cursor: pointer;
  }
`;

const CheckInput = styled.input`
  display: none;
  :checked + span {
    background-color: #d8d8d8;
    font-weight: bold;
    font-size:0.9vw;
  }
`;

const GroupLabel = styled.label`
  font-size: 0.9vw;
  font-weight: normal;
`;

const GroupInput = styled.input`
  width: 100%;
  height: 3vw;
  border-radius: 11px;
  background-color: #f4f4f4;
  color: #7a7d81;
  border: none;
  margin: 0.9vw 0 0 0;
  padding-left: 21px;
  box-sizing: border-box;
  font-size: 0.9vw;
  outline: none;
  ::placeholder {
    color: #c6c6c6;
  }
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

  ::placeholder {
    color: #c6c6c6;
  }
`;

export default Input;
