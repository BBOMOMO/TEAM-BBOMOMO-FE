import React, { useState } from "react";
import CertificationCard from "./CertificationCard";

import { actionCreators as postActions } from "../redux/modules/post";
import { useDispatch, useSelector } from "react-redux";

import apis from "../shared/apis";

const Certification = () => {
  const dispatch = useDispatch();
  const _roomlist = useSelector((state) => state.post.postList.board);
  console.log(_roomlist);

  // apis.checkUser().then(function (response) {
  //   console.log(response);
  //   // dispatch(loadPosts(response));
  // });

  //TODO : map list 연결 되면, button 눌렀을 때 3개씩 추가되는 부분 처리하기.
  //GroupRecommend 참고

  React.useEffect(() => {
    dispatch(postActions.getPosts());
  }, []);

  return (
    <div className="certifi_bx">
      <div className="certifi_title">
        <h2>공부인증</h2>
        <button>게시글 작성</button>
      </div>

      <div className="certifi_card_bx">
        {_roomlist &&
          _roomlist.map((a, b) => {
            console.log(a.postImg);
            let HH = Math.floor(a.studyTime / 60);
            let MM = a.studyTime % 60;
            let sTime = `${HH}: ${MM}`;
            return (
              <CertificationCard
                {...a}
                key={b}
                sTime={sTime}
              ></CertificationCard>
            );
          })}
      </div>

      <div className="certifi_more_btn">
        <button>더보기</button>
      </div>
    </div>
  );
};
export default Certification;
