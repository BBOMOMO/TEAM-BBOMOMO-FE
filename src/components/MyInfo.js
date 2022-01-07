import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Input from "../elements/Input";
import roundCircle from "../Images/Group3366.png";
import userImg from "../Images/user.png";
import pencil from "../Images/pencil.png";
import CreateGroup from "../components/CreateGroup";
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

  const saveMsg = (e) => {
    console.log(valueName);
    dispatch(userActions.statMsgDB(valueName));
  };

  // console.log("user",category)

  React.useEffect(() => {
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
    }
  }, [category]);

  return (
    <>
      <div className="myinfo_container">
        <div className="myinfo_profile_area">
          <img src={roundCircle} />
          <img src={userImg} className="myinfo_user_img" />
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
              placeholder={statusMsg}
              height="36px"
              color="#282828"
              size="13px"
            />
            <img
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
            {/* <p>랭킹</p> */}
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
          <p onClick={openModal}>+ 그룹 만들기</p>
          <CreateGroup showModal={showModalCG} closeModal={closeModal} />
        </div>
      </div>
    </>
  );
};

export default MyInfo;
