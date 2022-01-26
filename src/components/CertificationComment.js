import React, { useState } from "react";
import styled from "styled-components";
import { Input } from "../elements";
import CertificationCommentList from "./CertificationCommentList";
import CertificationDeleteModal from "./CertificationDeleteModal";
import CertificationEditModal from "./CertificationEditModal";

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

  const [showEditModal, setShowEditModal] = useState(false);
  const openEditBtn = () => {
    setShowEditModal(true);
  };
  const closeEditBtn = () => {
    setShowEditModal(false);
  };

  const [showEditToggle, setShowEditToggle] = useState(false);
  const openEditToggle = () => {
    if (showEditToggle === false) {
      setShowEditToggle(true);
    } else {
      setShowEditToggle(false);
    }
  };
  const closeEditToggle = () => {
    setShowEditToggle(false);
  };

  const [commentInfo, setCommentInfo] = useState();

  // ///////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const [background, setBackground] = useState(BG1);
  const css = {
    backgroundImage: `url(${background})`,
  };
  const [bgBlack, setbgBlack] = useState("");

  // 댓글 작성 막기
  const user = useSelector((state) => state.user.userInfo);
  const userNick = localStorage.getItem("nick");
  const postDetail = useSelector((state) => state.post.postListDetail);
  // console.log(postDetail.User);
  const profileImg = useSelector((state) => state.post.profileImg);
  const profileNick = useSelector((state) => state.post.profileNick);
  const postId = useSelector((state) => state.post.postListDetail.postId);
  const postBg = useSelector((state) => state.post.postListDetail.postImg);
  const commentList = useSelector((state) => state.comment.commentList);

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
      setbgBlack("");
    } else if (postBg === "blue") {
      setBackground(BG2);
      setbgBlack("");
    } else if (postBg === "green") {
      setBackground(BG3);
      setbgBlack("");
    } else if (postBg === "purple") {
      setBackground(BG4);
      setbgBlack("");
    } else {
      setBackground(postBg);
      setbgBlack("bg_black");
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
              setCommentText("");
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
                    setCommentText("");
                    closeModal();
                  }}
                />
              </div>

              <div className="certifi_comment_cont_bx">
                <div className="comment_cont_left">
                  <ModalInnerBg style={css} className={bgBlack}>
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
                      <h4>{profileNick}</h4>
                    </div>
                    <div className="my_profile_right">
                      {/* 로그인한 아이디랑 상세조회 아이디랑 비교 */}
                      {profileNick !== userNick ? null : (
                        <>
                          <button
                            className="post_del_btn"
                            onClick={() => {
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
                        if (a.User.nick !== userNick) {
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
                              <ChangeBtnBx
                                onClick={() => {
                                  setCommentInfo({
                                    postId: postId,
                                    cmtId: a.commentId,
                                    cmt: a.comment,
                                  });
                                  openEditToggle();
                                }}
                              >
                                {showEditToggle ? (
                                  <ChangeCmt>
                                    <p
                                      className="EditP"
                                      onClick={() => {
                                        closeEditToggle();
                                        openEditBtn();
                                      }}
                                    >
                                      수정
                                    </p>
                                    <p
                                      className="DeleteP"
                                      onClick={() => {
                                        closeEditToggle();
                                        openDeleteBtn();
                                      }}
                                    >
                                      삭제
                                    </p>
                                  </ChangeCmt>
                                ) : null}
                              </ChangeBtnBx>

                              <CertificationEditModal
                                showModal={showEditModal}
                                closeModal={closeEditBtn}
                                commentInfo={commentInfo}
                              />
                              <CertificationDeleteModal
                                showModal={showDeleteModal}
                                closeModal={closeDeleteBtn}
                                commentInfo={commentInfo}
                              />
                            </CertificationCommentListBx>
                          );
                        }
                      })}
                  </div>

                  <div className="certifi_conmment_input_bx">
                    {user ? (
                      <img
                        src={send}
                        alt="보내기 아이콘"
                        onClick={() => {
                          if (commentText === "") {
                            window.alert("내용을 입력해주세요.");
                          } else {
                            sendComment();
                            setCommentText("");
                          }
                        }}
                      />
                    ) : (
                      <img
                        src={send}
                        alt="보내기 아이콘"
                        onClick={() => {
                          window.alert("로그인 후 사용해주세요.");
                        }}
                      />
                    )}

                    <Input
                      value={commentText}
                      boxSizing
                      height="3vw"
                      radius="0.8vw"
                      border="none"
                      display="block"
                      color="#7A7D81"
                      padding="5px 55px 5px 18px"
                      _onChange={(e) => {
                        setCommentText(e.target.value);
                      }}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          onsubmit(e);
                        }
                      }}
                      onSubmit={() => {
                        sendComment();
                        setCommentText("");
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
  width: 55vw;
  height: auto;
  border-radius: 0.76vw;
  background-color: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  line-height: 1.2;
`;

const ModalInnerContainer = styled.div`
  width: 55vw;
  height: auto;
  margin: 0 auto;
  *margin-top: 3.06vw;
  *margin-bottom: 3.06vw;
  padding: 2vw;
  box-sizing: border-box;
  text-align: left;
`;

const ModalInnerBg = styled.div`
  position: relative;
  margin-bottom: 2vw;
  padding: 2vw;
  width: 23.67vw;
  height: 31.17vw;
  border-radius: 0.76vw;
  background-repeat: no-repeat;
  background-size: cover;
  &.bg_black:before {
    content: "";
    position: absolute;
    background-color: rgba(0, 0, 0, 50%);
    top: 0;
    left: 0;
    width: 23.67vw;
    height: 31.17vw;
    border-radius: 0.76vw;
  }
`;
const CertificationCommentListBx = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.69vw;
`;

const ChangeBtnBx = styled.div`
  position: relative;
  margin-top: 0.3vw;
  width: 1.46vw;
  height: 1.46vw;
  background-image: url(${menu});
  background-size: cover;
  cursor: pointer;
  /* .change_btn_img {
    width: 1.46vw;
    height: 1.46vw;
    cursor: pointer;
    margin-top: 0.3vw;
  } */
`;
const ChangeCmt = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: absolute;
  top: 1.8229vw;
  right: 0.5208vw;
  width: 4.6875vw;
  height: 4.6875vw;
  background-color: #ffffff;
  box-shadow: 0px 1px 8px 2px rgba(150, 150, 150, 0.25);
  color: #242424;
  font-size: 0.8vw;
  font-weight: 600;
  text-align: center;
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 1px;
    background-color: #e7e7e7;
  }
  .EditP {
    /* border-bottom: 1px solid red; */
  }
  .DeleteP {
  }
`;
export default CertificationComment;
