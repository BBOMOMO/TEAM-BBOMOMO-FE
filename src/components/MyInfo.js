import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Input from "../elements/Input";
import roundCircle from "../Images/timestat/notimestat.png";
import user from "../Images/nouser.png";
import pencil from "../Images/pencil.png";
import CreateGroup from "../components/CreateGroup";
import camera from "../Images/icon_camera_w.png";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";

const MyInfo = (props) => {
  const dispatch = useDispatch();
  const [showModalCG, setShowModalCG] = React.useState(false);
  const [cateName, setCateName] = React.useState("");

  //클릭 시 모달창 열기
  const openModal = () => {
    setShowModalCG(true);
  };
  const closeModal = () => {
    setShowModalCG(false);
  };
  const user = useSelector((state) => state.user.userInfo);
  const nickname = user.user[0].nick;
  const category = user.user[0].category;
  const statusMsg = user.user[0].statusMsg;
  const today = user.todayRecord[0].today;
  const total = user.totalRecord[0].total;
  const [valueName, setValue] = React.useState(statusMsg);
  const [file, setFile] = React.useState(null);
  const [userImg, setUserImg] = React.useState(null);
  const profImg = user.user[0].profileImg;
  const [background, setBackground] = React.useState(
    profImg ? profImg : "/static/media/nouser.3c586078.png"
  );

  const [studyCnt, setStudyCnt] = React.useState(0);

  const css = {
    backgroundImage: `url(${background})`,
  };
  const saveMsg = (e) => {
    e.preventDefault();
    //console.log(valueName);
    dispatch(userActions.statMsgDB(valueName));
  };

  // console.log("user",category)

  React.useEffect(() => {
    dispatch(userActions.checkUserDB());
    //카테고리 숫자 별 구분
    if (category === "0") {
      setCateName("중1");
    } else if (category === "1") {
      setCateName("중2");
    } else if (category === "2") {
      setCateName("중3");
    } else if (category === "3") {
      setCateName("고1");
    } else if (category === "4") {
      setCateName("고2");
    } else if (category === "5") {
      setCateName("고3");
    } else if (category === "6") {
      setCateName("대학생");
    } else if (category === "7") {
      setCateName("직장인");
    }

    // console.log("file:",file)
    // console.log("nickname:",nickname)
    // console.log("nickname:",category)

    if (file) {
      dispatch(userActions.changeImgDB(file));
    }
  }, [file, category, nickname]);

  const today2 = 900;
  const total2 = today2 * 0.25;

  //console.log("studyTotal",total2);

  return (
    <>
      <div className="myinfo_container">
        <div className="myinfo_profile_area">
          <CircleWrap>
            <img src={roundCircle} style={{ width: "260px" }} />
            <Circlebar studyTotal={"rotate(" + total2 + "deg)"} />
          </CircleWrap>

          <label style={css} className="myinfo_user_img">
            <span>
              <img src={camera} alt="사진변경하기" />
            </span>
            <input
              type="file"
              onChange={(e) => {
                setUserImg(e.target.dataset.userImg);
                setFile(e.target.files[0]);
                const objectURL = URL.createObjectURL(e.target.files[0]);
                console.log(objectURL);
                setBackground(objectURL);
              }}
            />
          </label>
        </div>

        <div className="myinfo_txt_area">
          <div className="myinfo_user_info">
            <span className="myinfo_user_division">{cateName}</span>
            <h3 className="myinfo_user_name">{nickname}</h3>
          </div>
          <div className="myinfo_user_state_area">
            <Input
              value={valueName}
              _onChange={(e) => setValue(e.target.value)}
              placeholder={statusMsg ? statusMsg : "목표를 입력해주세요."}
              height="36px"
              color="#282828"
              size="13px"
              onSubmit={saveMsg}
            />
            <img
              type="submit"
              src={pencil}
              alt="저장하기"
              title="저장하기"
              className="myinfo_user_state_pencil"
              onClick={saveMsg}
            />
          </div>
        </div>
        <div className="myinfo_studytime">
          <div className="myinfo_studytime_top">
            <p className="underline">내 공부시간</p>
            <p className="">랭킹</p>
            {/* 랭킹은 추후 업데이트 */}
          </div>
          <div className="myinfo_studytime_mid">
            <p className="myinfo_studytime_today">Today</p>
            <p className="myinfo_studytime_today_time">{today}</p>
          </div>
          <div className="myinfo_studytime_bot">
            <p className="myinfo_studytime_total">Total</p>
            <p className="myinfo_studytime_total_time">{total}</p>
          </div>
        </div>
        <div className="myinfo_make_group">
          <p onClick={openModal}>+ 스터디룸 만들기</p>
          <CreateGroup showModal={showModalCG} closeModal={closeModal} />
        </div>
      </div>
    </>
  );
};

export default MyInfo;

const Circlebar = styled.span`
  position: absolute;
  display: block;
  width: 50%;
  height: 1px;
  *background: #ff0000;
  left: 50%;
  top: 50%;
  z-index: 1;
  transform: rotate(95deg);
  *transform: rotate(445deg);

  :before {
    content: "";
    position: absolute;
    top: -14px;
    right: -10px;
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  }
  transform-origin: left;
  animation: animate 1s forwards;

  @keyframes animate {
    0% {
      transform: rotate(95deg);
    }
    100% {
      transform: ${(props) => props.studyTotal};
    }
  }
`;

const CircleWrap = styled.div`
  position: relative;
  display: block;
  width: 260px;
  height: 260px;
  margin: 0 auto;
`;
