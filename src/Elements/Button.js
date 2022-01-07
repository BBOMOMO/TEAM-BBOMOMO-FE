import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    text,
    children,
    width,
    color,
    background,
    fontSize,
    border,
    height,
    radius,
    margin,
    weight,
    groupButton,
    padding,
    _onClick,
  } = props;

  const styles = {
    width,
    color,
    background,
    fontSize,
    border,
    height,
    radius,
    margin,
    weight,
    padding,
  };

  if (groupButton) {
    // 그룹방만들기 모달창
    return (
      <>
        <GroupButton {...styles} onClick={_onClick}>
          {children}
        </GroupButton>
      </>
    );
  }

  return (
    <ElButton {...styles} onClick={_onClick}>
      {children}
    </ElButton>
  );
};

Button.defaultProps = {
  width: false,
  color: "#fff",
  background: "#272727",
  fontSize: "24px",
  background:"#486bff",
  _onClick: () => {},
};

const GroupButton = styled.div`
  font-size: 16px;
  background: #f4f4f4;
  display: inline-block;
  padding: 15px 20px;
  border-radius: 11px;
  color: #cdcdcd;
  font-weight: normal;
  margin: 0 15px 16px 0;
`;

const ElButton = styled.button`
  text-align: center;
  width: 100%;
  color: ${(props) => props.color};
  background: ${(props) => props.background};
  font-size: ${(props) => props.fontSize};
  ${(props) => (props.border ? `border: ${props.border};` : "")}
  ${(props) => (props.height ? `height: ${props.height};` : "")}
  ${(props) => (props.radius ? `border-radius: ${props.radius};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.weight ? `font-weight: ${props.weight};` : "")}
`;

export default Button;
