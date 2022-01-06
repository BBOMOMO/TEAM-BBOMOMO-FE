import React from "react";
// import styled from "styled-components";
import { Button, Input } from "../elements";
import search from "../Images/ic_header_search.png";

import GroupBx from "./GroupBx";
import { actionCreators as roomActions } from "../redux/modules/group";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";

const GroupRecommend = (props) => {
  const dispatch = useDispatch();
  const _roomlist = useSelector((state) => state.group.roomList);
  const roomlist = _roomlist.list;

  const [roomcount, setRoomcount] = React.useState(6);

  const roomSlice = () => {
    if (roomlist) {
      const _roomSlice = roomlist.slice(0, roomcount);
      return _roomSlice;
    }
  };
  // console.log("roomlist",roomlist)
  const seeMore = () => {
    console.log("클릭");
    setRoomcount(roomcount + roomcount);
  };

  React.useEffect(() => {
    dispatch(roomActions.getRooms());
  }, []);

  return (
    <div className="groupreco_bx">
      <div className="groupreco_top">
        <h2>뽀모님을 위한 그룹 추천</h2>

        <div className="groupreco_search">
          <ul className="hashtag_list_bx">
            <li>
              <Button
                padding="10px 18px"
                border="1px solid #ADADAD"
                radius="18px"
                background="#fff"
                color="#000"
                fontSize="14px"
              >
                수능
              </Button>
            </li>
            <li>
              <Button
                padding="10px 18px"
                border="1px solid #ADADAD"
                radius="18px"
                background="#fff"
                color="#000"
                fontSize="14px"
              >
                내신
              </Button>
            </li>
            <li>
              <Button
                padding="10px 18px"
                border="1px solid #ADADAD"
                radius="18px"
                background="#fff"
                color="#000"
                fontSize="14px"
              >
                자습
              </Button>
            </li>
            <li>
              <Button
                padding="10px 18px"
                border="1px solid #ADADAD"
                radius="18px"
                background="#fff"
                color="#000"
                fontSize="14px"
              >
                자격증
              </Button>
            </li>
            <li>
              <Button
                padding="10px 18px"
                border="1px solid #ADADAD"
                radius="18px"
                background="#fff"
                color="#000"
                fontSize="14px"
              >
                공무원
              </Button>
            </li>
            <li>
              <Button
                padding="10px 18px"
                border="1px solid #ADADAD"
                radius="18px"
                background="#fff"
                color="#000"
                fontSize="14px"
              >
                기타
              </Button>
            </li>
          </ul>

          <div className="search_bx">
            <Input
              type="text"
              value="asd"
              margin="0"
              padding="8px 34px 8px 10px"
              radius="18px"
              height="auto"
            />
            <img src={search} alt="돋보기 아이콘" />
          </div>
        </div>
      </div>
      {/* <div className="groupreco_bottom">
        <div className="groupbx_card">
          <GroupBx roomLock></GroupBx>
        </div>
        <div className="groupbx_card">
          <GroupBx></GroupBx>
        </div>
        <div className="groupbx_card">
          <GroupBx></GroupBx>
        </div>
        <div className="groupbx_card">
          <GroupBx></GroupBx>
        </div>
        <div className="groupbx_card">
          <GroupBx></GroupBx>
        </div>
        <div className="groupbx_card">
          <GroupBx></GroupBx>
        </div>
      </div> */}

      <div className="groupreco_bottom">
        {roomSlice() &&
          roomSlice().map((p, idx) => {
            let bgcolor = "";
            if (idx % 6 === 0) {
              bgcolor = "bg01";
            } else if (idx % 6 === 1) {
              bgcolor = "bg02";
            } else if (idx % 6 === 2) {
              bgcolor = "bg03";
            } else if (idx % 6 === 3) {
              bgcolor = "bg04";
            } else if (idx % 6 === 4) {
              bgcolor = "bg05";
            } else if (idx % 6 === 5) {
              bgcolor = "bg06";
            }

            return (
              <>
                <div
                  className="groupbx_card"
                  onClick={() => {
                    history.push("/video/" + roomlist[idx].roomId);
                  }}
                >
                  <GroupBx key={p.idx} {...p} bgcolor={bgcolor}></GroupBx>
                </div>
              </>
            );
          })}
      </div>

      <div className="groupreco_more_btn" onClick={seeMore}>
        <button>더보기</button>
      </div>
    </div>
  );
};

export default GroupRecommend;
