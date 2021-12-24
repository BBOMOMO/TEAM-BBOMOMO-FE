import React from "react";
import styled from "styled-components";

const Input = (props) => {
  const { text,placeholder,type ,_onChange,value} = props;
  const styles = {};
  return (
    <ElLabel>
      {text}
      <ElInput type={type} placeholder={placeholder} onChange={_onChange} value={value} {...styles}/>
    </ElLabel>
  );
};

Input.defaultProps = {
  label:'',
  placeholder:'placeholder',
  type:'text',
  value:'',
  padding:"10px",
  boxSizing:'border-box',
  _onChange:()=>{},
};

const ElLabel = styled.label`
  font-size: 18px;
  font-weight: normal;
  
`;

const ElInput = styled.input`
  width: 100%;
  height: 62px;
  border-radius: 11px;
  font-size: 18px;
  color:#c6c6c6;
  padding-left: 21px;
  background-color: #f4f4f4;
  outline: none;
  border:none;
  margin-top:10px;
  box-sizing: border-box;
`;

export default Input;
