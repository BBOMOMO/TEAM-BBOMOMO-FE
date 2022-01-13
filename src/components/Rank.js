import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

function Rank({ today, total }) {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(userActions.getLankDB());
  }, []);
  const rankInfo = useSelector((state) => state);
  console.log(rankInfo);

  return (
    <RankContainer>
      <div className="myinfo_studytime_mid">
        <p className="myinfo_studytime_today">랭크</p>
        <p className="myinfo_studytime_today_time">{today}</p>
      </div>

      <div className="myinfo_studytime_bot">
        <p className="myinfo_studytime_total">랭크</p>
        <p className="myinfo_studytime_total_time">{total}</p>
      </div>
      <div className="myinfo_studytime_bot">
        <p className="myinfo_studytime_total">랭크</p>
        <p className="myinfo_studytime_total_time">{total}</p>
      </div>
      <div className="myinfo_studytime_bot">
        <p className="myinfo_studytime_total">랭크</p>
        <p className="myinfo_studytime_total_time">{total}</p>
      </div>
      <div className="myinfo_studytime_bot">
        <p className="myinfo_studytime_total">랭크</p>
        <p className="myinfo_studytime_total_time">{total}</p>
      </div>
    </RankContainer>
  );
}

export default Rank;
const RankContainer = styled.div`
  width: 100%;
  height: 224px;
`;
