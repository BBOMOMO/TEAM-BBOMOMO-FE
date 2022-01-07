import React, { useState } from "react";
import CertificationCard from "./CertificationCard";
import CertificationWrite from "./CertificationWrite";
import CertificationComment from "./CertificationComment";

import { actionCreators as postActions } from "../redux/modules/post";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

// import CertificationCard from "./CertificationCard";
import apis from "../shared/apis";

const Certification = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(userActions.checkUserDB());
  }, []);
  const _roomlist = useSelector((state) => state.post.postList.board);
  console.log(_roomlist, "roomlist");
  const postTest = useSelector((state) => state.post);
  console.log(postTest, "postTest");
  const userInfo = useSelector((state) => state.user.userInfo);
  console.log(userInfo);

  // console.log(_roomlist.postId);

  const [showWriteModal, setShowWritefoModal] = React.useState(false);
  const [showCommentModal, setShowCommentfoModal] = React.useState(false);

  const openPostWrite = () => {
    setShowWritefoModal(true);
  };
  const closePostWrite = () => {
    setShowWritefoModal(false);
  };

  const openPostComment = () => {
    setShowCommentfoModal(true);
  };
  const closePostComment = () => {
    setShowCommentfoModal(false);
  };

  // apis.checkUser().then(function (response) {
  //   console.log(response);
  //   // dispatch(loadPosts(response));
  // });

  // apis.getPostdetail().then(function (response) {
  //   console.log(response);
  //   // dispatch(loadPosts(response));
  // });

  // const goDetail = () => {
  //   apis.getPostdetail(_roomlist.postId).then(function (response) {
  //     console.log(response);
  //     // dispatch(loadPosts(response));
  //   });
  // };

  //TODO : map list 연결 되면, button 눌렀을 때 3개씩 추가되는 부분 처리하기.
  //GroupRecommend 참고

  React.useEffect(() => {
    dispatch(postActions.getPosts());
  }, []);

  return (
    <>
      <div className="certifi_bx">
        <CertificationWrite
          showModal={showWriteModal}
          closeModal={closePostWrite}
        ></CertificationWrite>
        <CertificationComment
          showModal={showCommentModal}
          closeModal={closePostComment}
        ></CertificationComment>
        <div className="certifi_title">
          <h2>공부인증</h2>
          <button onClick={openPostWrite}>게시글 작성</button>
        </div>

        <div className="certifi_card_bx">
          {_roomlist &&
            _roomlist.map((a, b) => {
              // let HH = Math.floor(a.studyTime / 60);
              // let MM = a.studyTime % 60;
              // let sTime = `${HH}: ${MM}`;
              return (
                <div
                  onClick={() => {
                    let postId = a.postId;
                    let idx = b;
                    console.log(postId);
                    openPostComment();
                    dispatch(postActions.detailPost(idx));
                    apis.getPostdetail(postId).then(function (response) {
                      // console.log(a.data);
                      // dispatch(loadPosts(response));
                    });
                  }}
                >
                  <CertificationCard
                    {...a}
                    key={b}
                    // sTime={sTime}
                  ></CertificationCard>
                </div>
              );
            })}
        </div>

        <div className="certifi_more_btn">
          <button>더보기</button>
        </div>
      </div>
    </>
  );
};
export default Certification;
