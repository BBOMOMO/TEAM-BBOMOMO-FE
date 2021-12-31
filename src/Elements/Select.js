import React from "react";
import styled from "styled-components";
import arrow from "../Images/arrow.png";

const Select = (props) => {
  const { text, children, boxSizing, border, display, color, margin,createGroup, className , name, _onChange} = props;
  const labelStyle = { display, color };
  const styles = { boxSizing, border, display, margin,className,name };

  if(createGroup){
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
      <ElImg src={arrow} />
      <ElSelect {...styles} onChange={_onChange}>
        {children}
      </ElSelect>
    </ElLabel>
  );
};

Select.defaultProps = {
  _onChange: ()=>{}
}

const GroupSelectLabel = styled.label`
font-size:16px;
font-weight:normal;
position: relative;
`;
const GroupSelect=styled.select`
  width:100%;
  height:44px;
  border-radius:11px;
  font-size:16px;
  font-weight:bold;
  padding:0 27px;
  background-color: #f4f4f4;
  border:none;
  color: #222;
  margin-top:16px;
  text-align: center;
  appearance: none;  
  -webkit-appearance:none; /* for chrome */
  -moz-appearance:none; /*for firefox*/

  background-image:url(${arrow});
  background-repeat: no-repeat;
  background-position:  95% 17px;
  background-size: 24px;
   :focus {  
    outline: none;
  }

  option {
    padding:5px;
  }
`;

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
  -webkit-appearance:none; /* for chrome */
  -moz-appearance:none; /*for firefox*/
  ${(props) => (props.boxSizing ? `box-sizing: border-box;` : "")}
  ${(props) => (props.border ? `border: ${props.border};` : "")}
  ${(props) => (props.display ? `display: ${props.display};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
`;

export default Select;
