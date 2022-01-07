import React from "react";
import CertificationCard from "./CertificationCard";
import CertificationWrite from "./CertificationWrite";
import CertificationComment from "./CertificationComment";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const Certification = (props) => {
  const dispatch = useDispatch();
  const _postlist = useSelector((state) => state.post.postList.board);

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
          {_postlist &&
            _postlist.map((a, b) => {
              let postBg = a.postImg;
              let idx = b;
              let sortBg = "";
              if (postBg.includes("https")) {
                sortBg = "certifi_card_list_bx black-bg";
              } else {
                sortBg = "certifi_card_list_bx nomal-bg";
              }
              return (
                <div
                  className="CertificationCardBx"
                  onClick={() => {
                    openPostComment();
                    dispatch(postActions.detailPost(idx));
                    dispatch(postActions.detailPostBg(postBg));
                  }}
                >
                  <CertificationCard
                    {...a}
                    key={b}
                    sortBg={sortBg}
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
