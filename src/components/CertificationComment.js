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
import BG1 from "../Images/study-certification-bg-1.png";
import BG2 from "../Images/study-certification-bg-2.png";
import BG3 from "../Images/study-certification-bg-3.png";
import BG4 from "../Images/study-certification-bg-4.png";

const CertificationComment = ({ showModal, closeModal }) => {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const [background, setBackground] = useState(BG1);
  const css = {
    backgroundImage: `url(${background})`,
  };
  const [editTxt, setEditTxt] = React.useState(true);
  const [postContent, setPostContent] = useState("");

  const test = useSelector((state) => state.post.postListDetail);
  // console.log(test);
  const postId = useSelector((state) => state.post.postListDetail.postId);
  const postBg = useSelector((state) => state.post.postListDetail.postImg);
  const array = useSelector((state) => state.post.postListDetail.Comments);
  const commentList = useSelector((state) => state.comment.commentList);

  // let qaz = response.data;
  // console.log(qaz);
  // const reverse = commentList.reverse();
  // console.log(reverse);
  // console.log(array.length);
  // if (typeof commentList === ob) {
  //   console.log(123);
  // }

  const userNick = localStorage.getItem("nick");
  const sendComment = () => {
    dispatch(commentActions.addCommentDB(userNick, postId, commentText));
  };

  let studyTime;
  let getTime = test.studyTime;
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
    dispatch(commentActions.loadcomments(test.Comments));
  }, [test]);

  return (
    <>
      {showModal && test ? (
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
                      {editTxt ? (
                        <p>{test.postContent}</p>
                      ) : (
                        <textarea
                          value={postContent}
                          placeholder={test.postContent}
                          onChange={(e) => {
                            setPostContent(e.target.value);
                          }}
                        ></textarea>
                      )}
                    </div>
                  </ModalInnerBg>

                  <div className="comment_my_profile_bx">
                    <div className="my_profile_left">
                      <div className="my_profile_img_bx">
                        <img src={profileimg} alt="프로필 이미지" />
                      </div>
                      <h4>{test.nick}</h4>
                    </div>
                    <div className="my_profile_right">
                      {/* <img src={comment} alt="댓글 아이콘" />
                      <p>{commentCnt}</p> */}
                      {test.nick !== userNick ? null : (
                        <>
                          <button
                            className="post_edit_btn"
                            onClick={() => {
                              console.log("수정");
                              setEditTxt(false);
                            }}
                          >
                            수정
                          </button>
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
                        if (a.length === 1) {
                          console.log(123);
                        }
                        return (
                          <CertificationCommentList
                            {...a}
                            key={b}
                          ></CertificationCommentList>
                        );
                      })}
                    {/* {} */}
                    {/* <CertificationCommentList></CertificationCommentList> */}
                  </div>

                  <div className="certifi_conmment_input_bx">
                    <img
                      src={send}
                      alt="자물쇠 아이콘"
                      onClick={() => {
                        sendComment();
                        setCommentText("");
                      }}
                    />
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
