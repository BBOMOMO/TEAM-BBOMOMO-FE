import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export const TimeGrid = (props) => {
  console.log(props);
  const [timer, setTimer] = useState("");
  const timerHandle = () => {
    setTimer(`남은 시간은 ${props.min}분 ${props.sec}초 입니다.`);
  };
  // const restinterval = setInterval(timerHandle, 1000);
  return <div style={{ color: "#fff" }}>{timer}</div>;
};

export default TimeGrid;
