import React from "react";
import MediaQuery from "react-responsive";
import {useMediaQuery} from "react-responsive";

export const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 1500 })
  return isDesktop ? children : null
}
export const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1499 })
  return isTablet ? children : null
}