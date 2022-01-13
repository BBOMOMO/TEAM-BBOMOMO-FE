import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Peer from "peerjs";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ChatRoomNav from "./ChatRoomNav";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as groupAction } from "../redux/modules/group";
import Header from "../components/Header";
import GroupChat from "./GroupChat";
import profile from "../Images/profile.png";
import dotenv from "dotenv";

dotenv.config();

const GroupContainer = styled.div`
  padding-top: 110px;
  display: flex;
`;
const GroupCont = styled.div`
  width: 1197px;
`;
const GroupTimer = styled.div`
  height: 152px;
  position: relative;
`;
const ChatRoom = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  #video-grid {
    box-sizing: border-box;
    width: 1197px;
    display: flex;
    flex-wrap: wrap;
    .video_box {
      height: 300px;
      margin-left: 18px;
      &:nth-child(3n + 1) {
        margin-left: 0px;
      }
      &:nth-child(n + 4) {
        margin-top: 25px;
      }
      video {
        width: 387px;
        height: 236px;
        border-radius: 11px;
        object-fit: cover;
      }
    }
  }
`;

export default function VideoChatRoom() {
  // Global
  const dispatch = useDispatch();
  let userId = localStorage.getItem("id");
  let userNick = localStorage.getItem("nick");
  let statusMsg = localStorage.getItem("statusMsg");
  let peerstatusMsg = "";
  let peerStatusMsg = "";
  let peerNickname = "";
  let peernick = "";
  const params = useParams();
  const roomId = params.roomId;

  //채팅방 open/close - 민지
  const [openChat, setOpenChat] = useState("");

  // useEffect(() => {
  //   dispatch(groupAction.enterRoom(roomId));
  // }, []);

  // Local
  // const [cameraOn, setCameraOn] = useState(true);
  const [state, setState] = useState("5 : 00");
  const [text, setText] = useState("쉬는 시간입니다.");
  const [timerTime, setTimerTime] = useState(0);

  let myStream = null;
  let myPeerId = "";
  let allStream = useRef();
  let timerRef = useRef();
  const videoGrid = useRef();
  const myVideo = useRef();
  const videoContainer = useRef();
  const progressbar = useRef();
  const round = useRef();
  const url = process.env.REACT_APP_API_URL;

  let percent;
  let totalPercent;
  let percentBar;

  const endBtn = () => {
    dispatch(groupAction.exitRoom(roomId));
    history.push("/");
    window.location.reload();
  };

  useEffect(() => {
    dispatch(groupAction.enterRoom(roomId));
    const socket = io(url, { transports: ["websocket"] });
    const peer = new Peer();

    console.log(peer);

    // 클라의 영상 스트림 비디오에 넣기
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        myStream = stream;
        let streamId = stream.id;
        addVideoStream(myVideo.current, stream);
        videoGrid.current.prepend(myVideo.current);
        allStream.current = stream;

        // 타이머 이벤트
        let gapTimeFloor;
        // 쉬는시간
        socket.on("restTime", (currentRound, totalRound, time) => {
          console.log(currentRound, totalRound, time);
          const endTime = time;
          const nowTime = new Date().getTime();
          const gapTime = endTime - nowTime;

          // console.log(gapTime);
          // setTimerTime(gapTime);
          // console.log(timerTime);
          gapTimeFloor = Math.floor(gapTime / 1000);
          let MinTime = Math.floor(gapTime / (1000 * 60));
          let secTime = Math.floor((gapTime % (1000 * 60)) / 1000);
          // console.log(MinTime, secTime, gapTimeFloor);
          totalPercent = gapTimeFloor;
          setText("쉬는 시간입니다.");
          setOpenChat("");
          progressbar.current.style.width = `0%`;
          round.current.innerText = `${currentRound} / ${totalRound} 라운드`;
          let timer = () => {
            gapTimeFloor = gapTimeFloor - 1;
            console.log(gapTimeFloor);
            percent = totalPercent - gapTimeFloor;
            percentBar = (percent / totalPercent) * 100;
            console.log(percent, totalPercent, percentBar);
            progressbar.current.style.width = `${percentBar}%`;
            let min = Math.floor(gapTimeFloor / 60);
            let sec = gapTimeFloor % 60;
            setState(`${min} : ${sec}`);
            // console.log(`남은 시간은 ${min}분 ${sec}초 입니다.`, "쉬는시간");
            // timerRef.current.innerText = `남은 시간은 ${min}분 ${sec}초 입니다. 쉬는시간`;
            // if (min === 0 && sec === 0)
            if (gapTimeFloor <= 0) {
              console.log(currentRound, totalRound);
              console.log("쉬는시간 종료");
              currentRound = currentRound + 1;
              console.log(currentRound, "현재 라운드");
              socket.emit("endRest", currentRound);
              clearInterval(restinterval);
            }
          };
          const restinterval = setInterval(timer, 1000);
        });

        // 공부시간
        socket.on("studyTime", (currentRound, totalRound, time) => {
          console.log(time);
          const endTime = time;
          const nowTime = new Date().getTime();
          const gapTime = endTime - nowTime;
          gapTimeFloor = Math.floor(gapTime / 1000);
          let MinTime = Math.floor(gapTime / (1000 * 60));
          let secTime = Math.floor((gapTime % (1000 * 60)) / 1000);
          // console.log(MinTime, secTime, gapTimeFloor);
          totalPercent = gapTimeFloor;
          setText("공부 시간입니다.");
          setOpenChat("focusTime");
          progressbar.current.style.width = `0%`;
          round.current.innerText = `${currentRound} / ${totalRound} 라운드`;
          let timer = () => {
            gapTimeFloor = gapTimeFloor - 1;
            console.log(gapTimeFloor);
            percent = totalPercent - gapTimeFloor;
            percentBar = (percent / totalPercent) * 100;
            console.log(percent, totalPercent, percentBar);
            progressbar.current.style.width = `${percentBar}%`;
            let min = Math.floor(gapTimeFloor / 60);
            let sec = gapTimeFloor % 60;
            setState(`${min} : ${sec}`);
            if (gapTimeFloor <= 0) {
              console.log(
                currentRound,
                totalRound,
                "현재 라운드와 토탈 라운드"
              );
              console.log("수업시간 종료");
              if (currentRound !== totalRound) {
                socket.emit("endStudy");
                // socket.emit("endStudy", roomId, userId, userNick);
                console.log("endStudy 발생");
              }
              if (currentRound === totalRound) {
                socket.emit("totalEnd");
                // socket.emit("totalEnd", roomId, userId, userNick);
              }
              clearInterval(studyinterval);
            }
          };
          const studyinterval = setInterval(timer, 1000);
        });

        socket.on("totalEnd", (time) => {
          const endTime = time;
          const nowTime = new Date().getTime();
          const gapTime = endTime - nowTime;
          gapTimeFloor = Math.floor(gapTime / 1000);
          let MinTime = Math.floor(gapTime / (1000 * 60));
          let secTime = Math.floor((gapTime % (1000 * 60)) / 1000);
          // console.log(MinTime, secTime, gapTimeFloor);
          setText("모두 수고하셨습니다.");
          let timer = () => {
            gapTimeFloor = gapTimeFloor - 1;
            console.log(gapTimeFloor);
            let min = Math.floor(gapTimeFloor / 60);
            let sec = gapTimeFloor % 60;
            setState(`${min} : ${sec}`);
            if (gapTimeFloor <= 0) {
              clearInterval(goodByeinterval);
              history.push("/");
            }
          };
          const goodByeinterval = setInterval(timer, 1000);
        });

        peer.on("open", (peerId) => {
          //소켓을 통해 서버로 방ID, 유저ID 보내주기
          console.log(peerId);
          myPeerId = peerId;
          setTimeout((peerId) => {
            socket.emit(
              "join-room",
              roomId,
              peerId,
              userId,
              userNick,
              streamId,
              statusMsg
            );
          }, 2000);
          // socket.emit(
          //   "join-room",
          //   roomId,
          //   peerId,
          //   userId,
          //   userNick,
          //   streamId,
          //   statusMsg
          // );
        });

        // 피어 생성하기
        // peer.on("open", (peerId) => {
        //   //소켓을 통해 서버로 방ID, 유저ID 보내주기
        //   console.log(peerId);
        //   myPeerId = peerId;
        //   socket.emit(
        //     "join-room",
        //     roomId,
        //     peerId,
        //     userId,
        //     userNick,
        //     streamId,
        //     statusMsg
        //   );
        // });

        // 새로운 피어가 연결을 원할 때
        peer.on("call", (mediaConnection) => {
          // socket.on("peer-on", (peernick, peerstatusMsg) => {
          //   peerStatusMsg = peerstatusMsg;
          //   peerNickname = peernick;
          //   console.log(peerStatusMsg, peerNickname);
          // });
          //answer()를 해야 mediaConnection이 활성화됨
          mediaConnection.answer(stream);
          const videoBox = document.createElement("div");
          videoBox.classList.add("video_box");
          console.log("div 클래스 추가 videobox");
          const peerVideo = document.createElement("video");
          const txtBox = document.createElement("div");
          console.log("div 추가");
          txtBox.classList.add("userview_txtbox");
          console.log("클래스 추가");
          const img = document.createElement("img");
          img.setAttribute("src", `${profile}`);
          img.classList.add("fl");
          const nameBox = document.createElement("div");
          nameBox.classList.add("userview_name", "fl");
          const peerstatus = document.createElement("p");
          peerstatus.innerText = peerStatusMsg;
          const peerNick = document.createElement("p");
          peerNick.innerText = peernick;
          nameBox.prepend(peerstatus);
          nameBox.prepend(peerNick);
          txtBox.prepend(nameBox);
          txtBox.prepend(img);
          // 텍스트 추가
          videoBox.prepend(peerVideo);
          console.log("newVideo 추가");
          videoBox.prepend(txtBox);
          console.log("textbox 추가");
          videoContainer.current.prepend(videoBox);
          console.log("prepend");

          mediaConnection.on("stream", (newStream) => {
            addVideoStream(peerVideo, newStream);
            videoBox.prepend(peerVideo);
            console.log(myPeerId, userNick);
          });

          mediaConnection.on("close", () => {
            socket.emit("camera-off", myPeerId, userNick);
            console.log(myPeerId, userNick);
          });
        });
        // 이게 제일 두번째 순서 -> peer.call(peerId, stream)
        socket.on("user-connected", (peerId, userNick, streamId, peerMsg) => {
          console.log(peerId, userNick, streamId, peerMsg);
          peerstatusMsg = peerMsg;
          const mediaConnection = peer.call(peerId, stream);
          const videoBox = document.createElement("div");
          videoBox.classList.add("video_box");
          console.log("div 클래스 추가 videobox");
          const newVideo = document.createElement("video");
          const txtBox = document.createElement("div");
          console.log("div 추가");
          txtBox.classList.add("userview_txtbox");
          console.log("클래스 추가");
          const img = document.createElement("img");
          img.setAttribute("src", `${profile}`);
          img.classList.add("fl");
          const nameBox = document.createElement("div");
          nameBox.classList.add("userview_name");
          nameBox.classList.add("fl");
          const peerstatus = document.createElement("p");
          peerstatus.innerText = peerstatusMsg;
          console.log(peerstatus.innerText);
          const peerNick = document.createElement("p");
          peerNick.innerText = userNick;
          nameBox.prepend(peerstatus);
          nameBox.prepend(peerNick);
          txtBox.prepend(nameBox);
          txtBox.prepend(img);
          // 텍스트 추가
          videoBox.prepend(newVideo);
          console.log("newVideo 추가");
          videoBox.prepend(txtBox);
          console.log("textbox 추가");
          videoContainer.current.prepend(videoBox);
          console.log("prepend");
          // newVideo.setAttribute("id", `${peerId}`);

          mediaConnection.on("stream", (newStream) => {
            addVideoStream(newVideo, newStream);
            videoBox.prepend(newVideo);
            // videoGrid.current.prepend(newVideo);
          });
        });
      });

    socket.on("user-disconnected", (peerId, userNick, streamId) => {
      const video = document.querySelectorAll("video");
      const video_box = document.querySelectorAll("video_box");
      const txt_box = document.querySelectorAll("userview_txtbox");
      const name_box = document.querySelectorAll("userview_name");
      console.log(video_box, txt_box, name_box);
      let removeVideo;
      // let removeBox;
      // let removeTxt;
      // let removeName;
      for (let i = 0; i < video.length; i++) {
        if (video[i].srcObject.id === streamId) {
          removeVideo = video[i];
          // removeBox = video_box[i];
          // removeTxt = txt_box[i];
          // removeName = name_box[i];
        }
      }
      // removeVideo.remove();
      removeVideo.parentNode.remove();
    });

    // 테스팅 필요
    return function cleanup() {
      myStream.getTracks().forEach((track) => {
        track.stop();
      });
      socket.disconnect();
      peer.destroy();
    };
  }, []);
  // if (userInfo == null) {
  //   return <></>;
  // }
  return (
    <>
      {/* <ChatRoomNav /> */}
      <Header is_studyroom />
      <GroupContainer>
        <ChatRoom>
          <GroupChat openChat={openChat} />
          <GroupCont>
            <GroupTimer>
              <p style={{ color: "#000" }} className="groupTimer_whatTime">
                {text}
              </p>
              <p
                ref={timerRef}
                style={{ color: "#000" }}
                className="groupTimer_timer"
              >
                {state}
              </p>
              <p className="groupTimer_end_btn" onClick={endBtn}>
                공부 끝내기
              </p>
              <div className="groupTimer_progress_background"></div>
              <div className="groupTimer_progress_bar" ref={progressbar}></div>
              <p className="groupTimer_round" ref={round}>
                0 / 4 라운드
              </p>
            </GroupTimer>
            <div id="video-grid" ref={videoContainer}>
              <div className="video_box" ref={videoGrid}>
                <video ref={myVideo} autoPlay playsInline></video>
                <div className="userview_txtbox clearfix">
                  <img src={profile} alt="프로필" className="fl" />
                  <div className="userview_name fl">
                    <p>{userNick}</p>
                    <p>{statusMsg}</p>
                  </div>
                  {/* <div className="fr userview_friend">친구신청</div> */}
                </div>
              </div>
            </div>
          </GroupCont>
        </ChatRoom>
      </GroupContainer>
    </>
  );
}

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
}
