import React from "react";
import styled from "styled-components";
import arrow from "../Images/arrow.png";

const Select = (props) => {
  const {
    text,
    children,
    boxSizing,
    border,
    display,
    color,
    margin,
    createGroup,
    className,
    name,
    _onChange,
    size,
    top,
    right,
    width,
    height,
    value,
  } = props;
  const labelStyle = { display, color, size };
  const styles = {
    boxSizing,
    border,
    display,
    margin,
    className,
    name,
    width,
    height,
    value,
  };
  const imgStyle = { top, right };

  if (createGroup) {
    return (
      <GroupSelectLabel {...labelStyle}>
        {text}
        <GroupSelect {...styles} onChange={_onChange}>
          {children}
        </GroupSelect>
      </GroupSelectLabel>
    );
  }

  return (
    <ElLabel {...labelStyle}>
      {text}
      <ElImg src={arrow} {...imgStyle} />
      <ElSelect {...styles} onChange={_onChange}>
        {children}
      </ElSelect>
    </ElLabel>
  );
};

Select.defaultProps = {
  _onChange: () => {},
  size: "0.8vw",
  top: "7.07vh",
  right: "21px",
  width: "498px",
  height: "6.35vh",
};

const GroupSelectLabel = styled.label`
  font-size: 0.9vw;
  font-weight: normal;
  position: relative;
`;
const GroupSelect = styled.select`
  width: 100%;
  height: 3vw;
  border-radius: 0.76vw;
  font-size: 0.9vw;
  font-weight: bold;
  padding: 0 1.88vw;
  background-color: #f4f4f4;
  border: none;
  color: #222;
  margin-top: 0.9vw;
  text-align: center;
  appearance: none;
  -webkit-appearance: none; /* for chrome */
  -moz-appearance: none; /*for firefox*/

  background-image: url(${arrow});
  background-repeat: no-repeat;
  background-position: 95% 1.18vw;
  background-size: 0.8vw;
  :focus {
    outline: none;
  }

  option {
    padding: 5px;
  }
`;

const ElLabel = styled.label`
  font-weight: normal;
  ${(props) => (props.color ? `color: ${props.color};` : "")}
  position: relative;
  ${(props) => (props.size ? `font-size: ${props.size};` : "")}
`;

const ElImg = styled.img`
  width: 14px;
  height: 8px;
  position: absolute;
  z-index: 999;
  ${(props) => (props.top ? `top: ${props.top};` : "")}
  ${(props) => (props.right ? `right: ${props.right};` : "")}
`;

const ElSelect = styled.select`
  border-radius: 11px;
  font-size: 24px;
  padding: 0 27px;
  background-color: #f4f4f4;
  font-size: 0.8vw;
  color: #7a7d81;
  appearance: none;
  -webkit-appearance: none; /* for chrome */
  -moz-appearance: none; /*for firefox*/
  ${(props) => (props.boxSizing ? `box-sizing: border-box;` : "")}
  ${(props) => (props.border ? `border: ${props.border};` : "")}
  ${(props) => (props.display ? `display: ${props.display};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.width ? `width: ${props.width};` : "")};
  ${(props) => (props.height ? `height: ${props.height};` : "")};
`;

export default Select;
