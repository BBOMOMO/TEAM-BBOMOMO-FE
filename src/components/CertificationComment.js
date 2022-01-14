import React, { useState } from "react";
import styled from "styled-components";
import { Input } from "../elements";
import CertificationCommentList from "./CertificationCommentList";
import CertificationDeleteModal from "./CertificationDeleteModal";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { actionCreators as postActions } from "../redux/modules/post";

import apis from "../shared/apis";

import profileimg_default from "../Images/nouser_2.png";
import close from "../Images/ic_header_close.png";
import send from "../Images/ic-send 1.png";
import menu from "../Images/ic-comment-menu.png";
import BG1 from "../Images/study-certification-bg-1.png";
import BG2 from "../Images/study-certification-bg-2.png";
import BG3 from "../Images/study-certification-bg-3.png";
import BG4 from "../Images/study-certification-bg-4.png";

const CertificationComment = ({ showModal, closeModal }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const openDeleteBtn = () => {
    setShowDeleteModal(true);
  };
  const closeDeleteBtn = () => {
    setShowDeleteModal(false);
  };

  const [ckNum, setCkNum] = useState(0);

  // ///////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const [background, setBackground] = useState(BG1);
  const css = {
    backgroundImage: `url(${background})`,
  };

  // 댓글 작성 막기
  const user = useSelector((state) => state.user.userInfo);
  const userGetNick = useSelector((state) => state.user.userNick);
  const test = useSelector((state) => state.user.profileImg);
  // console.log(test);
  console.log(userGetNick);
  const userNick = localStorage.getItem("nick");
  console.log(userNick);
  const postDetail = useSelector((state) => state.post.postListDetail);
  const profileImg = useSelector((state) => state.post.profileImg);
  const postId = useSelector((state) => state.post.postListDetail.postId);
  const postBg = useSelector((state) => state.post.postListDetail.postImg);
  const commentList = useSelector((state) => state.comment.commentList);
  // console.log(commentList.length);
  const sendComment = () => {
    dispatch(commentActions.addCommentDB(userNick, postId, commentText));
  };

  // 공부시간
  let studyTime;
  let getTime = postDetail.studyTime;
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

  React.useEffect(() => {
    if (postBg === "orange") {
      setBackground(BG1);
    } else if (postBg === "blue") {
      setBackground(BG2);
    } else if (postBg === "green") {
      setBackground(BG3);
    } else if (postBg === "purple") {
      setBackground(BG4);
    } else {
      setBackground(postBg);
    }
  }, [postBg]);

  React.useEffect(() => {
    dispatch(commentActions.loadcomments(postDetail.Comments));
    // dispatch(postActions.getPostsDB());
  }, [postDetail]);

  return (
    <>
      {showModal && postDetail ? (
        <ModalContainer>
          <ModalBG
            onClick={() => {
              dispatch(postActions.getPostsDB());
              closeModal();
            }}
          />
          <ModalBox>
            <ModalInnerContainer>
              <div className="certifi_comment_title_bx">
                <h2>공부인증</h2>
                <img
                  src={close}
                  alt="닫기 아이콘"
                  onClick={() => {
                    dispatch(postActions.getPostsDB());
                    closeModal();
                  }}
                />
              </div>

              <div className="certifi_comment_cont_bx">
                <div className="comment_cont_left">
                  <ModalInnerBg style={css}>
                    <div className="certifi_comment_bg">
                      <h3>{studyTime}</h3>
                      <p>{postDetail.postContent}</p>
                    </div>
                  </ModalInnerBg>

                  <div className="comment_my_profile_bx">
                    <div className="my_profile_left">
                      <div className="my_profile_img_bx">
                        {!profileImg ? (
                          <img src={profileimg_default} alt="프로필 이미지" />
                        ) : (
                          <img src={profileImg} alt="프로필 이미지" />
                        )}
                      </div>
                      <h4>{userGetNick}</h4>
                    </div>
                    <div className="my_profile_right">
                      {userGetNick !== userNick ? null : (
                        <>
                          <button
                            className="post_del_btn"
                            onClick={() => {
                              // console.log("삭제");
                              apis.postDelete(postId);
                              dispatch(postActions.getPostsDB());
                              // setCommentNum(commentList.length);
                              closeModal();
                            }}
                          >
                            삭제
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="comment_cont_right">
                  <div className="certifi_conmment_list_bx">
                    {commentList &&
                      commentList.map((a, b) => {
                        console.log(userNick);
                        console.log(a.User);
                        if (userGetNick !== userNick) {
                          return (
                            <CertificationCommentListBx>
                              <CertificationCommentList
                                {...a}
                                key={b}
                              ></CertificationCommentList>
                            </CertificationCommentListBx>
                          );
                        } else {
                          return (
                            <CertificationCommentListBx>
                              <CertificationCommentList
                                {...a}
                                key={b}
                              ></CertificationCommentList>
                              <img
                                data-commentidnum={a.commentId}
                                src={menu}
                                alt="메뉴 아이콘"
                                className="delete_img"
                                onClick={(e) => {
                                  let commentIdNum = Number(
                                    e.target.dataset.commentidnum
                                  );
                                  setCkNum(
                                    Number(e.target.dataset.commentidnum)
                                  );
                                  if (commentIdNum === a.commentId) {
                                    console.log("같다");
                                    console.log(a.commentId);
                                    openDeleteBtn();
                                  }
                                }}
                              />
                              <div
                                onClick={() => {
                                  console.log(ckNum);
                                  console.log(postId);
                                  // apis.commentDelete(postId, a.commentId);

                                  // closeDeleteBtn();
                                  console.log(postDetail.Comments);

                                  // apis
                                  //   .getComment(postId)
                                  //   .then(function (response) {
                                  //     console.log(response.data);
                                  //     dispatch(
                                  //       commentActions.loadcomments(
                                  //         response.data.comments
                                  //       )
                                  //     );
                                  //   });
                                }}
                              >
                                <CertificationDeleteModal
                                  showModal={showDeleteModal}
                                  closeModal={closeDeleteBtn}
                                  qwe={ckNum}
                                  asd={postId}
                                ></CertificationDeleteModal>
                              </div>
                            </CertificationCommentListBx>
                          );
                        }
                      })}
                  </div>

                  <div className="certifi_conmment_input_bx">
                    {user ? (
                      <img
                        src={send}
                        alt="자물쇠 아이콘"
                        onClick={() => {
                          sendComment();
                          setCommentText("");
                        }}
                      />
                    ) : (
                      <img
                        src={send}
                        alt="자물쇠 아이콘"
                        onClick={() => {
                          window.alert("로그인 후 사용해주세요.");
                        }}
                      />
                    )}

                    <Input
                      value={commentText}
                      boxSizing
                      height="54px"
                      radius="11px"
                      border="none"
                      display="block"
                      color="#7A7D81"
                      padding="5px 55px 5px 18px"
                      _onChange={(e) => {
                        setCommentText(e.target.value);
                      }}
                    ></Input>
                  </div>
                </div>
              </div>
            </ModalInnerContainer>
          </ModalBox>
        </ModalContainer>
      ) : null}
    </>
  );
};
const CertificationCommentListBx = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  .delete_img {
    width: 21px;
    height: 21px;
    cursor: pointer;
  }
`;
const ModalContainer = styled.div`
  position: relative;
`;

const ModalBG = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: 0.54;
  z-index: 999;
`;
const ModalBox = styled.div`
  position: fixed;
  width: 1096px;
  height: auto;
  border-radius: 16px;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  line-height: 1.2;
`;

const ModalInnerContainer = styled.div`
  width: 1030px;
  height: auto;
  margin: 0 auto;
  margin-top: 44px;
  margin-bottom: 44px;
  text-align: left;
`;

const ModalInnerBg = styled.div`
  margin-bottom: 40px;
  padding: 56px 30px 30px;
  height: 564px;
  border-radius: 11px;
  background-repeat: no-repeat;
  background-size: cover;
`;

export default CertificationComment;
