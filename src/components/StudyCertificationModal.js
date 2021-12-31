import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../elements/index";
// import {history} from "../redux/configureStore";
import close from "../Images/ic_header_close.png";
import BG from "../Images/study-certification-bg-4.png";

const StudyCertificationModal = () => {
  const [imgFile, setImgFile] = useState(null);
  return (
    <>
      <ModalContainer>
        <ModalBG />
        <ModalBox>
          <ModalInnerContainer>
            <div className="certification_title_bx">
              <h2>공부인증</h2>
              <img src={close} alt="" />
            </div>

            <ModalInnerBg className="certification_img_bx">
              <img
                src={imgFile}
                alt="선택한 파일 나옴"
                style={{ width: "456px" }}
              />
              <div>
                <h3>00:00</h3>
                <textarea></textarea>
                <div>
                  <input
                    type="radio"
                    id="btn1"
                    name="하나만"
                    className="btn btn1"
                  />
                  <input
                    type="radio"
                    id="btn2"
                    name="하나만"
                    className="btn btn2"
                  />
                  <input
                    type="radio"
                    id="btn3"
                    name="하나만"
                    className="btn btn3"
                  />
                  <input
                    type="radio"
                    id="btn4"
                    name="하나만"
                    className="btn btn4"
                  />
                  <div className="label_bg_btn_bx">
                    <label for="btn1" className="label_bg_btn1"></label>
                    <label for="btn2" className="label_bg_btn2"></label>
                    <label for="btn3" className="label_bg_btn3"></label>
                    <label for="btn4" className="label_bg_btn4"></label>
                  </div>

                  <input
                    type="file"
                    onChange={(e) => {
                      console.log(e.target.files[0].name);
                      const objectURL = URL.createObjectURL(e.target.files[0]);
                      setImgFile(objectURL);
                    }}
                  />
                </div>
              </div>
            </ModalInnerBg>

            <div className="certification_btn_bx">
              <Button
                padding="14px 0"
                border="none"
                radius="11px"
                background="#889CF2"
                fontSize="18px"
                weight="600"
              >
                작성하기
              </Button>
            </div>
          </ModalInnerContainer>
        </ModalBox>
      </ModalContainer>
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
  /* height: 564px;
  background-image: url(${BG});
  background-size: cover; */
`;
export default StudyCertificationModal;
