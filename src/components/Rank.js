import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

function Rank({ today, total }) {
  const rankInfo = useSelector((state) => state.user.studyRanking);
 // console.log(rankInfo);
  return (
    <RankContainer>
      {rankInfo.map((el, key) => {
        let hour = Math.floor(Number(el.weeklyRecord) / 60);
        let min = Number(el.weeklyRecord) % 60;
        let newHour = hour <= 9 ? "0" + hour : hour;
        let newMin = min <= 9 ? "0" + min : min;

        return (
          <div className="myinfo_rank_wrap clearfix">
            <p className="myinfo_rank">{key + 1}</p>
            <p className="myinfo_rank_name">{el.User.nick}</p>
            <p className="myinfo_rank_time">
              {newHour} : {newMin}
            </p>
          </div>
        );
      })}
    </RankContainer>
  );
}

export default Rank;
const RankContainer = styled.div`
  width: 100%;
  height:230px ;
  overflow-y: auto;
  padding-right: 9px;
  box-sizing: border-box;
  padding-bottom:3vw;
`;
