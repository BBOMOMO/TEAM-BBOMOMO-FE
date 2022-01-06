import React from "react";
import "../styles/css/group.css";
import styled from "styled-components";
import { Button, Input, Select } from "../elements/index";
import lock from "../Images/ic-lock-alt.png";
import unlock from "../Images/ic-lock-open-alt.png";
import close from "../Images/ic_header_close.png";
import { history } from "../redux/configureStore";
import { actionCreators as roomActions } from "../redux/modules/group";

import { useDispatch, useSelector } from "react-redux";

function CreateGroup({ showModal, closeModal }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state);
  const userId = user;
  // const userId = user.user[0].userId;
  //console.log("userId",userId)

  const [roomTitle, setRoomTitle] = React.useState("");
  const [roomPassword, setRoomPassword] = React.useState(null);
  const [roomPurpose, setRoomPurpose] = React.useState("0");
  const [round, setRound] = React.useState("1");
  const [studyTime, setStudyTime] = React.useState("");
  const [recessTime, setRecessTime] = React.useState("");
  const [openedAt, setOpenedAt] = React.useState("");
  const [roomStatus, setRoomStatus] = React.useState("0");

  const [count, setCount] = React.useState(0);

  //  QUESTION:  studyTime(공부시간) 이랑 recessTime(쉬는시간) 묶여있는데, 백에서 자동쉬는시간 값 넣ㅇㅓ줄 수 있는지.
  //  TODO:  select box 안에 기본으로 들어가 있는 값 default 값 들어가게 하기. 지금은 selectbox 새로 지정 안하면 값 안들어감.

  const is_filled = (e) => {
    setRoomTitle(e.target.value);
  };

  const is_study = (e) => {
    if (e) {
      setStudyTime(e.target.value);
      let currentData = e.target.value;
      if (currentData == "25") {
        setRecessTime("5");
      } else if (currentData == "50") {
        setRecessTime("10");
      }
    }
  };
  const is_start = (e) => {
    if (e) {
      setOpenedAt(e.target.value);
    }
  };
  const is_status = (e) => {
    setCount((prevCount) => prevCount + 1);
    console.log(count);

    if (count % 2 === 0) {
      setRoomStatus("1");
      console.log("비밀방");
    } else {
      setRoomStatus("0");
      setRoomPassword(null);
      console.log("공개방");
    }
  };

  const createRoom = (e) => {
    if (roomTitle === "") {
      window.alert("방 제목을 입력해주세요.");
    } else if (roomPurpose === "") {
      window.alert("공부 목적을 정해주세요.");
    } else if (round === "") {
      window.alert("진행 할 라운드 수를 정해주세요.");
    } else if (studyTime === "") {
      window.alert("공부 시간을 정해주세요");
    } else if (openedAt === "") {
      window.alert("쉬는 시간을 정해주세요");
    } else if (roomStatus == false && roomPassword == "") {
      window.alert("방 비밀번호를 입력해주세요");
    }

    // console.log("방정보", userId,roomTitle, roomPassword, roomPurpose, round, studyTime, recessTime, openedAt);
    dispatch(
      roomActions.addRoom(
        userId,
        roomTitle,
        roomStatus,
        roomPassword,
        roomPurpose,
        round,
        studyTime,
        recessTime,
        openedAt
      )
    );
  };

  return (
    <>
      {showModal ? (
        <ModalContainer>
          <ModalBG />
          <ModalBox>
            <ModalInnerContainer>
              <div className="group_modal_relative">
                <h2 className="group_modal_title">그룹 방 만들기</h2>
                <span
                  className="group_modal_close"
                  style={{ top: "0" }}
                  onClick={closeModal}
                >
                  <img src={close} alt="" />
                </span>
              </div>
              <div className="group_modal_hr"></div>

              <div className="group_modal_relative">
                <Input
                  createGroup
                  value={roomTitle}
                  _onChange={is_filled}
                  className="mb20"
                  text="방제"
                  placeholder="공부 목적을 적어주세요"
                  margin="16px 0 0 0"
                />
                <div className="group_modal_roomStatus" onClick={is_status}>
                  {roomStatus == "0" ? (
                    <img src={unlock} alt="공개방" />
                  ) : (
                    <img src={lock} alt="비공개방" />
                  )}
                </div>
                {roomStatus == "0" ? null : (
                  <Input
                    createGroup
                    value={roomPassword}
                    _onChange={(e) => {
                      setRoomPassword(e.target.value);
                    }}
                    className="mb20"
                    text="비밀번호"
                    placeholder="비밀방 비밀번호 "
                    margin="16px 0 0 0"
                  />
                )}
              </div>

              <Select
                className="mb20"
                createGroup
                text="공부 목적"
                value={roomPurpose}
                name="purpose"
                _onChange={(e) => {
                  const selectedPurpose = e.target.value;
                  setRoomPurpose(selectedPurpose);
                }}
              >
                <option value="0">자율할습</option>
                <option value="1">시험공부</option>
                <option value="2">수능공부</option>
                <option value="3">자격증 준비</option>
                <option value="4">공시</option>
                <option value="5">독서</option>
              </Select>

              <Select
                className="mb20"
                createGroup
                text="라운드"
                value={round}
                name="round"
                _onChange={(e) => {
                  const selectedRound = e.target.value;
                  setRound(selectedRound);
                }}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Select>

              <p className="group_modal_subtitle">공부시간/쉬는시간</p>
              <Input
                checkbox
                _name="studyTime"
                _onChange={is_study}
                value="25"
                text="25분/5분"
              />
              <Input
                checkbox
                _name="studyTime"
                _onChange={is_study}
                value="50"
                text="50분/10분"
              />

              <p className="group_modal_subtitle">시작시간</p>
              <Input
                checkbox
                _name="startTime"
                _onChange={is_start}
                value="0"
                text="바로 시작"
              />
              <Input
                checkbox
                _name="startTime"
                _onChange={is_start}
                value="3"
                text="3분 뒤 시작"
              />
              <Input
                checkbox
                _name="startTime"
                _onChange={is_start}
                value="5"
                text="5분 뒤 시작"
              />

              <Button
                _onClick={createRoom}
                //임시로 group 페이지로 이동하기
                //_onClick={()=>{history.push('/group');}}
                border="none"
                height="54px"
                radius="11px"
                fontSize="18px"
                margin="40px 0 40px 0"
                weight="600"
              >
                생성하기
              </Button>
            </ModalInnerContainer>
          </ModalBox>
        </ModalContainer>
      ) : null}
    </>
  );
}

const ModalContainer = styled.div`
  position: relative;
  z-index:99999;
`;

const ModalBG = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: 0.54;
  z-index: 99998!important;
`;
const ModalBox = styled.div`
  position: fixed;
  width: 548px;
  height: auto;
  border-radius: 16px;
  background-color: #fff;
  top: 50%;
  left: 50%;
  margin-top: -20%;
  margin-left: -274px;
  z-index: 99999!important;
  line-height: 1.2;
`;

const ModalInnerContainer = styled.div`
  width: 460px;
  height: auto;
  margin: 0 auto;
  margin-top: 37px;
  text-align: left;
`;

export default CreateGroup;
