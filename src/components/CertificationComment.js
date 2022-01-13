import React, { useState } from "react";
import styled from "styled-components";
import { Input } from "../elements";
import CertificationCommentList from "./CertificationCommentList";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { actionCreators as postActions } from "../redux/modules/post";

import apis from "../shared/apis";

import profileimg from "../Images/user.png";
import close from "../Images/ic_header_close.png";
import send from "../Images/ic-send 1.png";
import menu from "../Images/ic-comment-menu.png";
import BG1 from "../Images/study-certification-bg-1.png";
import BG2 from "../Images/study-certification-bg-2.png";
import BG3 from "../Images/study-certification-bg-3.png";
import BG4 from "../Images/study-certification-bg-4.png";

const CertificationComment = ({ showModal, closeModal }) => {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const openDeleteBtn = () => {
    setShowDeleteModal(true);
  };
  const closeDeleteBtn = () => {
    setShowDeleteModal(false);
  };

  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const [isShow, setIsShow] = useState("none");
  const opendel = () => {
    if (isShow === "none") {
      setIsShow("block");
    } else {
      setIsShow("none");
    }
  };

  const [ckNum, setCkNum] = useState(0);
  const [background, setBackground] = useState(BG1);
  const css = {
    backgroundImage: `url(${background})`,
  };

  // 댓글 작성 막기
  const user = useSelector((state) => state.user.userInfo);
  const postDetail = useSelector((state) => state.post.postListDetail);
  // console.log("게시글 상세조회", postDetail);
  const postId = useSelector((state) => state.post.postListDetail.postId);
  const postBg = useSelector((state) => state.post.postListDetail.postImg);
  const commentList = useSelector((state) => state.comment.commentList);

  const userNick = localStorage.getItem("nick");
  const sendComment = () => {
    dispatch(commentActions.addCommentDB(userNick, postId, commentText));
  };

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
  }, [postDetail]);

  return (
    <>
      {showModal && postDetail ? (
        <ModalContainer>
          <ModalBG
            onClick={() => {
              dispatch(postActions.getPostsDB());
              setIsShow("none");
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
                    setIsShow("none");
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
                        <img src={profileimg} alt="프로필 이미지" />
                      </div>
                      <h4>{postDetail.nick}</h4>
                    </div>
                    <div className="my_profile_right">
                      {postDetail.nick !== userNick ? null : (
                        <>
                          <button
                            className="post_del_btn"
                            onClick={() => {
                              // console.log("삭제");
                              apis.postDelete(postId);
                              dispatch(postActions.getPostsDB());
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
                        // console.log(b);
                        if (a.nick !== userNick) {
                          return (
                            <QWE>
                              <CertificationCommentList
                                {...a}
                                key={b}
                              ></CertificationCommentList>
                            </QWE>
                          );
                        } else {
                          return (
                            <QWE>
                              <CertificationCommentList
                                {...a}
                                key={b}
                                show={showDeleteModal}
                                close={closeDeleteBtn}
                                ckNum={ckNum}
                              ></CertificationCommentList>
                              <img
                                src={menu}
                                alt="메뉴 아이콘"
                                className="delete_img"
                                onClick={() => {
                                  setCkNum(a.commentId);
                                  console.log(a.commentId, "여기는 이미지");
                                  openDeleteBtn();
                                  opendel();
                                }}
                              />
                              {/* <div className={isShow}>보여라</div> */}
                            </QWE>
                          );
                        }
                      })}

                    {/* <CertificationCommentList></CertificationCommentList> */}
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
                          window.alert("로그인 필요합니다");
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
const QWE = styled.div`
  position: relative;
  display: flex;
  align-items: center;
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
