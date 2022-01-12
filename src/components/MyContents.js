import React from "react";
import styled from "styled-components";

function MyContents({today, total}) {
  return (
    <>
      <div className="myinfo_studytime_top">
        <p className="underline">내 공부시간</p>
        <p className="">랭킹</p>
        {/* 랭킹은 추후 업데이트 */}
      </div>
      <div className="myinfo_studytime_mid">
        <p className="myinfo_studytime_today">Today</p>
        <p className="myinfo_studytime_today_time">{today}</p>
      </div>
      <div className="myinfo_studytime_bot">
        <p className="myinfo_studytime_total">Total</p>
        <p className="myinfo_studytime_total_time">{total}</p>
      </div>
      
    </>
  )
}

export default MyContents;
