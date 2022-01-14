import React from "react";
import CertificationCard from "./CertificationCard";
import CertificationWrite from "./CertificationWrite";
import CertificationComment from "./CertificationComment";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import { history } from "../redux/configureStore";

const Certification = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const cardList = useSelector((state) => state.post.postList.board);
  // console.log("user", user);
  // console.log("cardList", cardList);

  const [roomcount, setRoomcount] = React.useState(3);
  const cardSlice = () => {
    if (cardList) {
      const _cardSlice = cardList.slice(0, roomcount);
      return _cardSlice;
    }
  };
  const seeMore = () => {
    setRoomcount(roomcount + roomcount);
  };

  const [showWriteModal, setShowWriteModal] = React.useState(false);
  const [showCommentModal, setShowCommentModal] = React.useState(false);

  const openPostWrite = () => {
    setShowWriteModal(true);
  };
  const closePostWrite = () => {
    setShowWriteModal(false);
  };

  const openPostComment = () => {
    setShowCommentModal(true);
  };
  const closePostComment = () => {
    setShowCommentModal(false);
  };

  React.useEffect(() => {
    dispatch(postActions.getPostsDB());
  }, []);

  //TODO : map list 연결 되면, button 눌렀을 때 3개씩 추가되는 부분 처리하기.
  //GroupRecommend 참고

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
          {user ? (
            <button onClick={openPostWrite}>게시글 작성</button>
          ) : (
            <button
              className="disabled"
              onClick={() => {
                window.alert("로그인 후 사용해주세요.");
                history.push("/login");
              }}
            >
              게시글 작성
            </button>
          )}
        </div>

        <div className="certifi_card_bx">
          {cardSlice() &&
            cardSlice().map((a, b) => {
              let postBg = a.postImg;
              let postId = a.postId;
              let sortBg = "";
              let commentCnt = a.commentCnt;
              console.log(commentCnt);
              if (postBg.includes("https")) {
                sortBg = "certifi_card_list_bx black-bg";
              } else {
                sortBg = "certifi_card_list_bx nomal-bg";
              }
              let studyTime;
              let getTime = a.studyTime;
              let HH = Math.floor(getTime / 60);
              let MM = getTime % 60;
              if (HH < 10 && MM < 10) {
                studyTime = `0${HH}:0${MM}`;
              } else if (HH < 10) {
                studyTime = `0${HH}:${MM}`;
              } else if (MM < 10) {
                studyTime = `${HH}:0${MM}`;
              } else {
                studyTime = `${HH}:${MM}`;
              }
              return (
                <div
                  className="CertificationCardBx"
                  onClick={() => {
                    dispatch(postActions.getPostDetailDB(postId));
                    openPostComment();
                  }}
                >
                  <CertificationCard
                    {...a}
                    key={b}
                    sortBg={sortBg}
                    studyTime={studyTime}
                    commentCnt={commentCnt}
                  ></CertificationCard>
                </div>
              );
            })}
        </div>

        <div className="certifi_more_btn" onClick={seeMore}>
          <button>더보기</button>
        </div>
      </div>
    </>
  );
};
export default Certification;
