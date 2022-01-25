import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Peer from "peerjs";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ChatRoomNav from "./ChatRoomNav";
import { history } from "../redux/configureStore";
import user, { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as groupAction } from "../redux/modules/group";
import Header from "../components/Header";
import GroupChat from "./GroupChat";
import profile from "../Images/profile.png";
import dotenv from "dotenv";
import PostChat from "../components/PostChat";
import VideoModal from "../components/VideoModal";
import VideoEndModal from "../components/VideoEndModal";
import { getContrastRatio } from "@material-ui/core";
import CameraBtn from "./CameraBtn";
import poster from "../Images/view.png";
dotenv.config();

const GroupContainer = styled.div`
  padding-top: 11.7vh;
  display: flex;
`;
const GroupCont = styled.div`
  width: 62%;
`;
const GroupTimer = styled.div`
  height: 18%;
  position: relative;
`;
const ChatRoom = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  #video-grid {
    height: 82%;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .video_box {
      width: 32%;
      position: relative;
      height: calc(50% - 12.5px);
      margin-left: 2%;
      &:nth-child(3n + 1) {
        margin-left: 0px;
      }
      &:nth-child(n + 4) {
        margin-top: 25px;
      }
      video {
        width: calc(100% - 1px);
        height: calc(78% - 1px);
        border-radius: 18px;
        object-fit: cover;
        position: relative;
        }
      
      }
    }
  }
`;

export default function VideoChatRoom() {
  // Global
  const dispatch = useDispatch();
  let userId = localStorage.getItem("id");
  let userNick = localStorage.getItem("nick");
  let UserNick = localStorage.getItem("nick");
  let statusMsg = localStorage.getItem("statusMsg");
  let peerstatusMsg = "";
  let peerStatusMsg = "";
  let peerNickname = "";
  let peernick = "";
  let users;
  let personInroom;
  let peersNick;
  let peersMsg;
  const params = useParams();
  const roomId = params.roomId;
  const modalState = useSelector((state) => state.group.modalState);
  const endModalState = useSelector((state) => state.group.endModalState);
  const studyRound = useSelector((state) => state.group.round);
  //채팅방 open/close - 민지
  const [openChat, setOpenChat] = useState("");

  // useEffect(() => {
  //   dispatch(groupAction.enterRoom(roomId));
  // }, []);

  // Local
  // const [cameraOn, setCameraOn] = useState(true);
  const [state, setState] = useState("05 : 00");
  const [text, setText] = useState("쉬는 시간입니다.");
  const [timerTime, setTimerTime] = useState(0);
  const [cameraOn, setCameraOn] = useState(true);
  const [display, setDisplay] = useState(false);

  let myStream = null;
  let myPeerId = "";
  let allStream = useRef();
  let timerRef = useRef();
  const videoGrid = useRef();
  const myVideo = useRef();
  const videoBack = useRef();
  const videoContainer = useRef();
  const progressbar = useRef();
  const round = useRef();
  const url = process.env.REACT_APP_API_URL;

  let percent;
  let totalPercent;
  let percentBar;

  const handleCamera = () => {
    setCameraOn((prev) => !prev);
    if (cameraOn) {
      let video = allStream.current.getTracks();
      video[0].enabled = false;
      let src = document.querySelector(".video_non_src");
      src.style.display = "block";
    } else {
      let video = allStream.current.getTracks();
      video[0].enabled = true;
      let src = document.querySelector(".video_non_src");
      src.style.display = "none";
    }
  };

  const endBtn = () => {
    dispatch(groupAction.exitRoom(roomId));
    history.push("/");
    window.location.reload();
  };

  useEffect(() => {
    dispatch(groupAction.enterRoom(roomId));
    const socket = io(url);
    const peer = new Peer({
      config: { iceServers: [{ url: "stun:stun.l.google.com:19302" }] },
    });
    peer.nick = UserNick;
    // 클라의 영상 스트림 비디오에 넣기

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        // console.log(stream);
        myStream = stream;
        let streamId = stream.id;
        addVideoStream(myVideo.current, stream);
        videoGrid.current.prepend(myVideo.current);
        allStream.current = stream;

        // 타이머 이벤트
        let gapTimeFloor;

        // 쉬는시간
        socket.on("restTime", (currentRound, totalRound, time, now) => {
          // console.log(currentRound, totalRound, time);
          // const endTime = time;
          // const nowTime = new Date().getTime();
          const gapTime = time - now;
          // console.log(time, now, gapTime);
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
            // console.log(gapTimeFloor);
            percent = totalPercent - gapTimeFloor;
            percentBar = (percent / totalPercent) * 100;
            // console.log(percent, totalPercent, percentBar);
            progressbar.current.style.width = `${percentBar}%`;
            let min = Math.floor(gapTimeFloor / 60);
            min = min < 10 ? "0" + min : min;
            let sec = gapTimeFloor % 60;
            sec = sec < 10 ? "0" + sec : sec;
            setState(`${min} : ${sec}`);
            // console.log(`남은 시간은 ${min}분 ${sec}초 입니다.`, "쉬는시간");
            // timerRef.current.innerText = `남은 시간은 ${min}분 ${sec}초 입니다. 쉬는시간`;
            // if (min === 0 && sec === 0)
            if (gapTimeFloor <= 0) {
              // console.log(currentRound, totalRound);
              // console.log("쉬는시간 종료");
              currentRound = currentRound + 1;
              // console.log(currentRound, "현재 라운드");
              socket.emit("endRest", currentRound);
              clearInterval(restinterval);
              dispatch(groupAction.groupRound(currentRound));
            }
          };
          const restinterval = setInterval(timer, 1000);
        });

        // 공부시간
        socket.on("studyTime", (currentRound, totalRound, time, now) => {
          dispatch(groupAction.groupRound(currentRound));
          // console.log(studyRound);
          // console.log(time);
          // const endTime = time;
          // const nowTime = new Date().getTime();
          const gapTime = time - now;
          // console.log(time, now, gapTime);
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
            // console.log(gapTimeFloor);
            percent = totalPercent - gapTimeFloor;
            percentBar = (percent / totalPercent) * 100;
            // console.log(percent, totalPercent, percentBar);
            progressbar.current.style.width = `${percentBar}%`;
            let min = Math.floor(gapTimeFloor / 60);
            min = min < 10 ? "0" + min : min;
            let sec = gapTimeFloor % 60;
            sec = sec < 10 ? "0" + sec : sec;
            setState(`${min} : ${sec}`);
            if (gapTimeFloor <= 0) {
              // console.log(
              //   currentRound,
              //   totalRound,
              //   "현재 라운드와 토탈 라운드"
              // );
              // console.log("수업시간 종료");
              if (currentRound !== totalRound) {
                dispatch(groupAction.groupModal(true));
                socket.emit("endStudy");
                // socket.emit("endStudy", roomId, userId, userNick);
                // console.log("endStudy 발생");
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

        socket.on("totalEnd", (time, now) => {
          // const endTime = time;
          // const nowTime = new Date().getTime();
          const gapTime = time - now;
          // console.log(time, now, gapTime);
          gapTimeFloor = Math.floor(gapTime / 1000);
          let MinTime = Math.floor(gapTime / (1000 * 60));
          let secTime = Math.floor((gapTime % (1000 * 60)) / 1000);
          // console.log(MinTime, secTime, gapTimeFloor);
          setText("모두 수고하셨습니다.");
          let timer = () => {
            gapTimeFloor = gapTimeFloor - 1;
            // console.log(gapTimeFloor);
            let min = Math.floor(gapTimeFloor / 60);
            min = min < 10 ? "0" + min : min;
            let sec = gapTimeFloor % 60;
            sec = sec < 10 ? "0" + sec : sec;
            setState(`${min} : ${sec}`);
            if (gapTimeFloor <= 0) {
              clearInterval(goodByeinterval);
              history.push("/");
            }
          };
          const goodByeinterval = setInterval(timer, 1000);
        });
        if (peer._id == null) {
          peer.on("open", (peerId) => {
            //소켓을 통해 서버로 방ID, 유저ID 보내주기
            // console.log(peerId);
            console.log(peerId);
            myPeerId = peerId;
            socket.emit(
              "join-room",
              roomId,
              peerId,
              userId,
              userNick,
              streamId,
              statusMsg
            );
          });
          // console.log(myPeerId);
        } else {
          socket.emit(
            "join-room",
            roomId,
            peer._id,
            userId,
            userNick,
            streamId,
            statusMsg
          );
          // console.log(peer._id);
        }

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

        socket.on("welcome", (user, person) => {
          // peerStatusMsg = peerstatusMsg;
          // peerNickname = peernick;
          // console.log(user, person);
          users = user;
          personInroom = person - 1;
        });

        // 데이터 주기
        peer.on("connection", (dataConnection) => {
          console.log("connect");
          console.log(dataConnection);
          peersNick = dataConnection.metadata.UserNick;
          peersMsg = dataConnection.metadata.statusMsg;
          console.log(peersNick);
          const peerstatus = document.createElement("p");
          peerstatus.innerText = peersMsg;
          const peerNick = document.createElement("p");
          peerNick.innerText = peersNick;
          const nameBox = document.querySelector(".userview_name");
          nameBox.prepend(peerstatus);
          nameBox.prepend(peerNick);
        });

        // 새로운 피어가 연결을 원할 때
        peer.on("call", (mediaConnection) => {
          console.log("call");
          //answer()를 해야 mediaConnection이 활성화됨
          // console.log(mediaConnection);
          mediaConnection.answer(stream);
          // console.log(mediaConnection);
          const videoBox = document.createElement("div");
          videoBox.classList.add("video_box");
          // console.log("div 클래스 추가 videobox");
          const peerVideo = document.createElement("video");
          const txtBox = document.createElement("div");
          // console.log("div 추가");
          txtBox.classList.add("userview_txtbox");
          // console.log("클래스 추가");
          const img = document.createElement("img");
          img.setAttribute("src", `${profile}`);
          img.classList.add("fl");
          const nameBox = document.createElement("div");
          nameBox.classList.add("userview_name", "fl");
          // const peerstatus = document.createElement("p"); // 일단 주석
          // peerstatus.innerText = peerStatusMsg; // 일단 주석
          // console.log(peerStatusMsg, "이너텍스트");
          // const peerNick = document.createElement("p"); // 일단 주석
          // peerNick.innerText = peersNick; // 일단 주석
          // peerNick.innerText = peerNickname;
          // console.log(peerNickname, "이너텍스트");
          // nameBox.prepend(peerstatus); // 일단 주석
          // nameBox.prepend(peerNick); // 일단 주석
          txtBox.prepend(nameBox);
          txtBox.prepend(img);
          // 텍스트 추가
          videoBox.prepend(peerVideo);
          // console.log("newVideo 추가");
          videoBox.prepend(txtBox);
          // console.log("textbox 추가");
          videoContainer.current.prepend(videoBox);
          // console.log("prepend");
          //

          mediaConnection.on("stream", (newStream) => {
            // console.log(peerVideo, newStream);
            addVideoStream(peerVideo, newStream);
            videoBox.prepend(peerVideo);
            // console.log(myPeerId, userNick);
          });

          mediaConnection.on("close", () => {
            socket.emit("camera-off", myPeerId, userNick);
            // console.log(myPeerId, userNick);
          });
        });
        // 이게 제일 두번째 순서 -> peer.call(peerId, stream)
        socket.on("user-connected", (peerId, userNick, streamId, peerMsg) => {
          console.log(peerId);
          peerstatusMsg = peerMsg;
          const peerInfo = {
            statusMsg,
            UserNick,
          };
          const mediaConnection = peer.call(peerId, stream); // 0124 0557 test
          const dataConnection = peer.connect(peerId, { metadata: peerInfo }); // 종찬아 여기서부터 하면 된다. 데이터커넥션은 성공했다. userID를 send 혹은 보낼 방법을 찾아보자.. // const 지움
          console.log(dataConnection);
          //
          dataConnection.send("message");
          //
          dataConnection.send("Hello!");
          // const mediaConnection = peer.call(peerId, stream, userNick, peerMsg);
          const videoBox = document.createElement("div");
          videoBox.classList.add("video_box");
          // console.log("div 클래스 추가 videobox");
          const newVideo = document.createElement("video");
          const txtBox = document.createElement("div");
          // console.log("div 추가");
          txtBox.classList.add("userview_txtbox");
          // console.log("클래스 추가");
          const img = document.createElement("img");
          img.setAttribute("src", `${profile}`);
          img.classList.add("fl");
          const nameBox = document.createElement("div");
          nameBox.classList.add("userview_name");
          nameBox.classList.add("fl");
          const peerstatus = document.createElement("p");
          peerstatus.innerText = peerstatusMsg;
          // console.log(peerstatus.innerText);
          const peerNick = document.createElement("p");
          peerNick.innerText = userNick;
          nameBox.prepend(peerstatus);
          nameBox.prepend(peerNick);
          txtBox.prepend(nameBox);
          txtBox.prepend(img);
          // 텍스트 추가
          videoBox.prepend(newVideo);
          // console.log("newVideo 추가");
          videoBox.prepend(txtBox);
          // console.log("textbox 추가");
          videoContainer.current.prepend(videoBox);
          // console.log("prepend");
          // newVideo.setAttribute("id", `${peerId}`);

          mediaConnection.on("stream", (newStream) => {
            addVideoStream(newVideo, newStream);
            videoBox.prepend(newVideo);
            // videoGrid.current.prepend(newVideo);
          });
        });
      })
      .catch((err) => {
        window.alert("브라우저의 카메라를 재설정 후 시도해주세요");
        history.push("/");
        dispatch(groupAction.exitRoom(roomId));
        window.location.reload();
      });

    socket.on("user-disconnected", (peerId, userNick, streamId) => {
      const video = document.querySelectorAll("video");
      const video_box = document.querySelectorAll("video_box");
      const txt_box = document.querySelectorAll("userview_txtbox");
      const name_box = document.querySelectorAll("userview_name");
      // console.log(video_box, txt_box, name_box);
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
      {endModalState ? <VideoEndModal endBtn={endBtn} /> : null}
      {modalState ? <VideoModal /> : null}
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
              <p
                className="groupTimer_end_btn"
                onClick={() => {
                  dispatch(groupAction.groupEndModal(true));
                }}
              >
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
                <div
                  className="video_non_src"
                  onMouseOver={() => {
                    videoBack.current.style.display = "block";
                    setDisplay(!display);
                  }}
                ></div>
                <video
                  ref={myVideo}
                  className="myvideo"
                  autoPlay
                  playsInline
                  onMouseOver={() => {
                    videoBack.current.style.display = "block";
                    setDisplay(!display);
                  }}
                ></video>
                <div
                  className="video_background"
                  ref={videoBack}
                  onMouseOut={() => {
                    videoBack.current.style.display = "none";
                    setDisplay(!display);
                  }}
                ></div>
                <CameraBtn
                  cameraOn={cameraOn}
                  display={display}
                  handleCamera={handleCamera}
                />

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
