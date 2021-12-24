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
  };

  return <ElButton {...styles}>{children}</ElButton>;
};

Button.defaultProps = {
  width: "100%",
  color: "#fff",
  background: "#272727",
  fontSize: "24px",
};

const ElButton = styled.button`
  text-align: center;
  width: ${(props) => props.width};
  color: ${(props) => props.color};
  background: ${(props) => props.background};
  font-size: ${(props) => props.fontSize};
  ${(props) => (props.border ? `border: ${props.border};` : "")}
  ${(props) => (props.height ? `height: ${props.height};` : "")}
  ${(props) => (props.radius ? `border-radius: ${props.radius};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.weight ? `font-weight: ${props.weight};` : "")}
`;

export default Button;
