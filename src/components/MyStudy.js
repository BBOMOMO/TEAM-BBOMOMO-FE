import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

function MyStudy({ today, total }) {
  const user = useSelector((state) => state.user.userInfo);
  //user 유무에따라 나타나기
  const studyTime = Number(useSelector((state) => state.user.studyTime));
  const studyTotal = Number(useSelector((state) => state.user.studyTotal));
  const todayHour = Math.floor(studyTime / 60);
  const todayMin = studyTime % 60;
  const newTodayHour = todayHour <= 9 ? "0" + todayHour : todayHour;
  const newTodaymin = todayMin <= 9 ? "0" + todayMin : todayMin;
  //
  const totalHour = Math.floor(studyTotal / 60);
  const totalyMin = studyTotal % 60;
  //console.log(totalHour);
  const newTotalHour = totalHour < 10 ? "0" + totalHour : totalHour;
  const newTotalmin = totalyMin < 10 ? "0" + totalyMin : totalyMin;
  if (!user) {
    return (
      <>
        <div className="myinfo_studytime_mid">
          <p className="myinfo_studytime_today">Today</p>
          <p className="myinfo_studytime_today_time">00 : 00</p>
        </div>
        <div className="myinfo_studytime_bot">
          <p className="myinfo_studytime_total">Total</p>
          <p className="myinfo_studytime_total_time">00 : 00</p>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="myinfo_studytime_mid">
        <p className="myinfo_studytime_today">Today</p>
        <p className="myinfo_studytime_today_time">
          {newTodayHour} : {newTodaymin}
        </p>
      </div>
      <div className="myinfo_studytime_bot">
        <p className="myinfo_studytime_total">Total</p>
        <p className="myinfo_studytime_total_time">
          {newTotalHour} : {newTotalmin}
        </p>
      </div>
    </>
  );
}

export default MyStudy;
