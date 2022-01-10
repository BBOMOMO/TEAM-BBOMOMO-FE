import React, { useState } from "react";
import styled from "styled-components";
import { Input } from "../elements";
import CertificationCommentList from "./CertificationCommentList";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";

import profileimg from "../Images/user.png";
import close from "../Images/ic_header_close.png";
import comment from "../Images/ic-comment.png";
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
  const _postlist = useSelector((state) => state.post.postList.board);
  const _detailPostIdx = useSelector((state) => state.post.detailPost.idx);
  const _postId = useSelector((state) => state.post.detailPost.postId);
  const _postBg = useSelector((state) => state.post.detailPostBg.postBg);
  const userTodayTime = useSelector((state) => state.user.studyTime);

  const _commentList = useSelector(
    (state) => state.comment.commentList.comment
  );

  const sendComment = () => {
    const userNick = localStorage.getItem("nick");
    dispatch(commentActions.addComment(userNick, _postId, commentText));
  };

  React.useEffect(() => {
    if (_postBg === "orange") {
      setBackground(BG1);
    } else if (_postBg === "blue") {
      setBackground(BG2);
    } else if (_postBg === "green") {
      setBackground(BG3);
    } else if (_postBg === "purple") {
      setBackground(BG4);
    } else {
      setBackground(_postBg);
    }
  }, [_postBg]);

  React.useEffect(() => {
    dispatch(commentActions.getComments(_postId));
  }, []);

  return (
    <>
      {showModal ? (
        <ModalContainer>
          <ModalBG onClick={closeModal} />
          <ModalBox>
            <ModalInnerContainer>
              <div className="certifi_comment_title_bx">
                <h2>공부인증</h2>
                <img src={close} alt="닫기 아이콘" onClick={closeModal} />
              </div>

              <div className="certifi_comment_cont_bx">
                <div className="comment_cont_left">
                  <ModalInnerBg style={css}>
                    <div className="certifi_comment_bg">
                      {userTodayTime === null ? (
                        <h3>00:00</h3>
                      ) : (
                        <h3>{userTodayTime}</h3>
                      )}
                      <p>{_postlist[_detailPostIdx].postContent}</p>
                    </div>
                  </ModalInnerBg>

                  <div className="comment_my_profile_bx">
                    <div className="my_profile_left">
                      <div className="my_profile_img_bx">
                        <img src={profileimg} alt="프로필 이미지" />
                      </div>
                      <h4>{_postlist[_detailPostIdx].nick}</h4>
                    </div>
                    <div className="my_profile_right">
                      <img src={comment} alt="댓글 아이콘" />
                      <p>1</p>
                    </div>
                  </div>
                </div>

                <div className="comment_cont_right">
                  <div className="certifi_conmment_list_bx">
                    {/* {_commentList &&
                      _commentList.map((a, b) => {
                        return (
                          <CertificationCommentList
                            {...a}
                            key={b}
                          ></CertificationCommentList>
                        );
                      })} */}
                    <CertificationCommentList
                      array={_commentList}
                    ></CertificationCommentList>
                  </div>

                  <div className="certifi_conmment_input_bx">
                    <img src={send} alt="자물쇠 아이콘" onClick={sendComment} />
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
