import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../elements/index";
// import {history} from "../redux/configureStore";
import close from "../Images/ic_header_close.png";
import BG1 from "../Images/study-certification-bg-1.png";
import BG2 from "../Images/study-certification-bg-2.png";
import BG3 from "../Images/study-certification-bg-3.png";
import BG4 from "../Images/study-certification-bg-4.png";

const CertificationWrite = () => {
  const [background, setBackground] = useState(BG1);
  const css = {
    backgroundImage: `url(${background})`,
  };
  return (
    <>
      <ModalContainer>
        <ModalBG />
        <ModalBox>
          <ModalInnerContainer>
            <div className="certifi_write_title_bx">
              <h2>공부인증</h2>
              <img src={close} alt="닫기 아이콘" />
            </div>

            <ModalInnerBg style={css}>
              <div className="certifi_write_post_bx">
                <div className="certifi_write_post_top">
                  <h3>10:12</h3>
                  <textarea placeholder="오늘 하루도 고생한 나에게 치얼스"></textarea>
                </div>

                <div className="bg_btn_bx">
                  <button
                    onClick={() => {
                      setBackground(BG1);
                    }}
                    className="bg_btn bg_btn1"
                  ></button>
                  <button
                    onClick={() => {
                      setBackground(BG2);
                    }}
                    className="bg_btn bg_btn2"
                  ></button>
                  <button
                    onClick={() => {
                      setBackground(BG3);
                    }}
                    className="bg_btn bg_btn3"
                  ></button>
                  <button
                    onClick={() => {
                      setBackground(BG4);
                    }}
                    className="bg_btn bg_btn4"
                  ></button>
                  <input
                    id="post_img_btn"
                    className="bg_btn_input"
                    type="file"
                    onChange={(e) => {
                      console.log(e.target.files[0].name);
                      const objectURL = URL.createObjectURL(e.target.files[0]);
                      setBackground(objectURL);
                    }}
                  />
                  <label for="post_img_btn" className="bg_btn bg_btn5"></label>
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
  margin: 26px 0 40px;
  padding: 56px 30px 30px;
  height: 564px;
  border-radius: 11px;
  background-repeat: no-repeat;
  background-size: cover;
`;

export default CertificationWrite;
