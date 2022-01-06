import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../elements/index";
// import {history} from "../redux/configureStore";
import apis from "../shared/apis";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
// import { getToken } from "../shared/token";

import close from "../Images/ic_header_close.png";
import BG1 from "../Images/study-certification-bg-1.png";
import BG2 from "../Images/study-certification-bg-2.png";
import BG3 from "../Images/study-certification-bg-3.png";
import BG4 from "../Images/study-certification-bg-4.png";

const CertificationWrite = ({ showModal, closeModal }) => {
  const dispatch = useDispatch();
  // 배경화면 지정
  const [background, setBackground] = useState(BG1);
  const css = {
    backgroundImage: `url(${background})`,
  };
  // 보여주기 위한 시간
  const [time, setTime] = useState("");

  // 버튼 활성화
  const [isActive1, setActive1] = useState(false);
  const [isActive2, setActive2] = useState(false);
  const [isActive3, setActive3] = useState(false);
  const [isActive4, setActive4] = useState(false);

  // dispatch
  // const [nick, setNick] = useState("");
  const [postContent, setPostContent] = useState("");
  // post넘겨주기 위한 숫자 시간
  const [studyTime, setStudyTime] = useState(0);
  const [file, setFile] = useState(null);
  const [bgtype, setBgType] = useState("");

  // apis.getPost().then(function (response) {
  //   console.log(response, "qweqeqwe");
  // });

  // 공부시간 가져오기
  // apis.getStudyTime().then(function (response) {
  //   const HH = Math.floor(response.data.studyTime.StudyTime / 60);
  //   const MM = response.data.studyTime.StudyTime % 60;
  //   setStudyTime(response.data.studyTime.StudyTime);
  //   setTime(`${HH}:${MM}`);
  // });

  const sendPost = () => {
    dispatch(
      postActions.addPost("walwalzz", postContent, studyTime, file, bgtype)
    );
  };
  return (
    <>
      {showModal ? (
        <ModalContainer>
          <ModalBG />
          <ModalBox>
            <ModalInnerContainer>
              <div className="certifi_write_title_bx">
                <h2>공부인증</h2>
                <img src={close} alt="닫기 아이콘" onClick={closeModal} />
              </div>

              <ModalInnerBg style={css}>
                <div className="certifi_write_post_bx">
                  <div className="certifi_write_post_top">
                    <h3>{time}</h3>
                    <textarea
                      placeholder="오늘 하루도 고생한 나에게 치얼스"
                      onChange={(e) => {
                        setPostContent(e.target.value);
                      }}
                    ></textarea>
                  </div>

                  <div className="bg_btn_bx">
                    <button
                      className={
                        isActive1 ? "bg_btn black_btn1" : "bg_btn bg_btn1"
                      }
                      data-bgtype="/static/media/study-certification-bg-1.ae6a94aa.png"
                      onClick={(e) => {
                        setActive1((isActive1) => {
                          if (isActive1 === false) {
                            setActive1(true);
                            setActive2(false);
                            setActive3(false);
                            setActive4(false);
                          } else {
                            setActive1(false);
                          }
                        });
                        setBgType(e.target.dataset.bgtype);
                        setBackground(BG1);
                      }}
                    ></button>
                    <button
                      className={
                        isActive2 ? "bg_btn black_btn2" : "bg_btn bg_btn2"
                      }
                      data-bgtype="/static/media/study-certification-bg-2.80d12dee.png"
                      onClick={(e) => {
                        setActive2((isActive2) => {
                          if (isActive2 === false) {
                            setActive2(true);
                            setActive1(false);
                            setActive3(false);
                            setActive4(false);
                          } else {
                            setActive2(false);
                          }
                        });
                        setBgType(e.target.dataset.bgtype);
                        setBackground(BG2);
                      }}
                    ></button>
                    <button
                      className={
                        isActive3 ? "bg_btn black_btn3" : "bg_btn bg_btn3"
                      }
                      data-bgtype="/static/media/study-certification-bg-3.61f1bcea.png"
                      onClick={(e) => {
                        setActive3((isActive3) => {
                          if (isActive3 === false) {
                            setActive3(true);
                            setActive1(false);
                            setActive2(false);
                            setActive4(false);
                          } else {
                            setActive3(false);
                          }
                        });
                        setBgType(e.target.dataset.bgtype);
                        setBackground(BG3);
                      }}
                    ></button>
                    <button
                      className={
                        isActive4 ? "bg_btn black_btn4" : "bg_btn bg_btn4"
                      }
                      data-bgtype="/static/media/study-certification-bg-4.770b8b22.png"
                      onClick={(e) => {
                        setActive4((isActive4) => {
                          if (isActive4 === false) {
                            setActive4(true);
                            setActive1(false);
                            setActive2(false);
                            setActive3(false);
                          } else {
                            setActive4(false);
                          }
                        });
                        setBgType(e.target.dataset.bgtype);
                        setBackground(BG4);
                      }}
                    ></button>
                    <input
                      id="post_img_btn"
                      className="bg_btn_input"
                      type="file"
                      data-bgtype="userImg"
                      onChange={(e) => {
                        setBgType(e.target.dataset.bgtype);
                        setFile(e.target.files[0]);
                        const objectURL = URL.createObjectURL(
                          e.target.files[0]
                        );
                        setBackground(objectURL);
                      }}
                    />
                    <label
                      for="post_img_btn"
                      className="bg_btn bg_btn5"
                    ></label>
                  </div>
                </div>
              </ModalInnerBg>

              <div className="certifi_write_btn_bx">
                <Button
                  padding="14px 0"
                  border="none"
                  radius="11px"
                  background="#889CF2"
                  fontSize="18px"
                  weight="600"
                  _onClick={() => {
                    sendPost();
                    closeModal();
                  }}
                >
                  작성하기
                </Button>
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
  width: 548px;
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
  width: 460px;
  height: auto;
  margin: 0 auto;
  margin-top: 44px;
  margin-bottom: 44px;
  text-align: left;
`;

const ModalInnerBg = styled.div`
  margin: 26px 0 40px;
  padding: 56px 30px 30px;
  height: 564px;
  border-radius: 11px;
  background-repeat: no-repeat;
  background-size: cover;
`;

export default CertificationWrite;
