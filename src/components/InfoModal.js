import React from "react";
import styled from "styled-components";
import close from "../Images/ic_header_close.png";
import Input from "../elements/Input";
import Select from "../elements/Select";
import { delToken } from "../shared/token";
import {history } from "../redux/configureStore";

import { useDispatch } from "react-redux";

function InfoModal({ showModal, closeModal }) {

  const logout = () => {
    delToken("login");
    window.location.reload("/");
  }
  return (
    <>
      {showModal ? (
        <div className="header_modal_container info_modal">
          <p className="header_modal_title">개인 정보 수정</p>
          <span className="group_modal_close" onClick={closeModal}>
            <img src={close} alt="" />
          </span>
          <div className="header_modal_hr"></div>

          <div>
            <div className="personal_info_edit">
              <div className="nickname_edit">
                <Input
                  text="닉네임 변경"
                  size="14px"
                  color="#7A7D81"
                  margin="8px 0 0 0"
                  height="51px"
                ></Input>
              </div>
              <div className="division_edit">
                <Select
                  text="구분 변경"
                  size="14px"
                  boxSizing
                  border="none"
                  display="block"
                  color="#7A7D81"
                  margin="8px 0 0 0"
                  height="51px"
                  name="category"
                  top="47px"
                  right="-330px"
                  width="100%"
                >
                  <option key="middle1" value="0">
                    {" "}
                    중1{" "}
                  </option>
                  <option key="middle2" value="1">
                    {" "}
                    중2{" "}
                  </option>
                  <option key="middle3" value="2">
                    {" "}
                    중3{" "}
                  </option>
                  <option key="high1" value="3">
                    {" "}
                    고1{" "}
                  </option>
                  <option key="high2" value="4">
                    {" "}
                    고2{" "}
                  </option>
                  <option key="high3" value="5">
                    {" "}
                    고3{" "}
                  </option>
                  <option key="univ" value="6">
                    {" "}
                    대학생{" "}
                  </option>
                </Select>
              </div>
            </div>
            <div className="header_modal_hr mt0"></div>
            <div className="userservice">
              <p className="userservice_btn">계정 설정</p>
              <p className="userservice_btn">문의 하기</p>
            </div>
            <div className="logout clearfix">
              <p className="logout_btn fr" onClick={logout}>로그아웃</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default InfoModal;
