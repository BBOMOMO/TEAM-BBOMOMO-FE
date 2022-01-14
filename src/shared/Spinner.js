import { useState } from "react";
import { css } from "@emotion/react";
import ClockLoader from "react-spinners/ClockLoader";
import styled from "styled-components";


// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: #889CF2;
`;

function Spinner() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState(" #889CF2");

  return (
    <div className="sweet-loading" style={{display:"grid", placeItems:"center", height:"100vh"}}>
      <ClockLoaderCustom color={color} loading={loading} css={override} size={150} />
    </div>
  );
}

export default Spinner;

const ClockLoaderCustom = styled(ClockLoader)`

`;
