import React from "react";
import styled from "styled-components";
import arrow from "../Images/arrow.png";

const Select = (props) => {
  const { text, children, boxSizing, border, display, color, margin } = props;
  const labelStyle = { display, color };
  const styles = { boxSizing, border, display, margin };
  return (
    <ElLabel {...labelStyle}>
      {text}
      <ElImg src={arrow} />
      <ElSelect {...styles}>
        <option key="middle1" value="middle1">
          중1
        </option>
        <option key="middle2" value="middle2">
          중2
        </option>
        <option key="middle3" value="middle3">
          중3
        </option>
        <option key="high1" value="high1">
          고1
        </option>
        <option key="high2" value="high2">
          고2
        </option>
        <option key="high3" value="high3">
          고3
        </option>
        <option key="univ" value="univ">
          대학생
        </option>
      </ElSelect>
    </ElLabel>
  );
};

const ElLabel = styled.label`
  font-size: 20px;
  font-weight: normal;
  ${(props) => (props.color ? `color: ${props.color};` : "")}
  position: relative;
`;

const ElImg = styled.img`
  width: 14px;
  height: 8px;
  position: absolute;
  top: 69px;
  right: 21px;
`;

const ElSelect = styled.select`
  width: 498px;
  height: 62px;
  border-radius: 11px;
  font-size: 24px;
  padding: 0 27px;
  background-color: #f4f4f4;
  color: #7a7d81;
  appearance: none;
  ${(props) => (props.boxSizing ? `box-sizing: border-box;` : "")}
  ${(props) => (props.border ? `border: ${props.border};` : "")}
  ${(props) => (props.display ? `display: ${props.display};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
`;

export default Select;
