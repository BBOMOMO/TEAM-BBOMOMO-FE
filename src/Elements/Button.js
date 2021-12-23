import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { text, children, width, color, background, fontSize } = props;
  const styles = { width, color, background, fontSize };

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
`;

export default Button;
