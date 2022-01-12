import React from "react";
import styled from "styled-components";

function MyStudy({today, total}) {
  //user 유무에따라 나타나기
  return (
    <>
      <div className="myinfo_studytime_mid">
        <p className="myinfo_studytime_today">Today</p>
        <p className="myinfo_studytime_today_time">00:00{today}</p>
      </div>
      <div className="myinfo_studytime_bot">
        <p className="myinfo_studytime_total">Total</p>
        <p className="myinfo_studytime_total_time">00:00{total}</p>
      </div>
      
    </>
  )
}

export default MyStudy;
