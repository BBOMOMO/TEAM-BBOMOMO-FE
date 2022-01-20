import React from "react";
import styled from "styled-components";
import { Button, Input } from "../elements";
import search from "../Images/ic_header_search.png";

import GroupBx from "./GroupBx";
import { actionCreators as roomActions } from "../redux/modules/group";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";

const GroupRecommend = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const _roomlist = useSelector((state) => state.group.roomList);
  const caterooms = useSelector((state) => state.group.cateroom);
  const roomlist = _roomlist.list;

  const usernick = localStorage.getItem("nick");
  const [roomcount, setRoomcount] = React.useState(6);

  const [activeCate, setActiveCate] = React.useState("All");
  const [roomPurpose, setRoomPurpose] = React.useState(null);
  const [isStarted, setIsStarted] = React.useState("");

  const roomSlice = () => {
    if (roomlist) {
      const _roomSlice = roomlist.slice(0, roomcount);
      return _roomSlice;
    }
  };
  const cateSlice = () => {
    if (caterooms) {
      const _cateSlice = caterooms.slice(0, roomcount);
      return _cateSlice;
    }
  };

 

  const seeMore = () => {
    setRoomcount(roomcount + roomcount);
  };

  React.useEffect(() => {
    dispatch(roomActions.getRooms());
    dispatch(roomActions.sortRooms(roomPurpose));
  }, [roomPurpose]);

  //console.log(roomPurpose,"카테고리별 방 확인 ",caterooms);
  return (
    <div className="groupreco_bx">
      <div className="groupreco_top">
        {usernick ? (
          <h2>{usernick}님을 위한 스터디룸 추천</h2>
        ) : (
          <h2>뽀모님을 위한 스터디룸 추천</h2>
        )}

        <div className="groupreco_search">
          <div className="hashtag_list_bx">
            <SearchTab
              name="all"
              onClick={() => {
                setRoomPurpose(null);
              }}
            >
              ALL
            </SearchTab>
            <SearchTab
              name="0"
              onClick={() => {
                setRoomPurpose(0);
              }}
            >
              자율학습
            </SearchTab>
            <SearchTab
              name="1"
              onClick={() => {
                setRoomPurpose(1);
              }}
            >
              시험공부
            </SearchTab>
            <SearchTab
              name="2"
              onClick={() => {
                setRoomPurpose(2);
              }}
            >
              수능공부
            </SearchTab>
            <SearchTab
              name="3"
              onClick={() => {
                setRoomPurpose(3);
              }}
            >
              자격증
            </SearchTab>
            <SearchTab
              name="4"
              onClick={() => {
                setRoomPurpose(4);
              }}
            >
              공무원
            </SearchTab>
            <SearchTab
              name="5"
              onClick={() => {
                setRoomPurpose(5);
              }}
            >
              기타
            </SearchTab>
          </div>

          {/* <div className="search_bx">
            <Input
              type="text"
              value="asd"
              margin="0"
              padding="8px 34px 8px 10px"
              radius="18px"
              height="auto"
            />
            <img src={search} alt="돋보기 아이콘" />
          </div> */}
        </div>
      </div>

      {roomPurpose === null ? (
        <>
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

                let roomLock = p.isStarted;
                //console.log("roomLock",roomLock);
                let isLock = "";
                if (roomLock === 1) {
                  // 잠긴 방
                  isLock = "cloudy_bg";
                  // console.log(idx, p.isStarted);
                  return (
                    <>
                      <div className="groupbx_card">
                        <GroupBx
                          key={p.idx}
                          {...p}
                          bgcolor={bgcolor}
                          roomLock={isLock}
                        ></GroupBx>
                      </div>
                    </>
                  );
                } else if (roomLock === 0) {
                  // console.log(idx, p.isStarted);
                  return (
                    <>
                      {user ? (
                        //로그인회원
                        <div
                          className="groupbx_card"
                          onClick={() => {
                            history.push("/video/" + roomlist[idx].roomId);
                          }}
                        >
                          <GroupBx
                            key={p.idx}
                            {...p}
                            bgcolor={bgcolor}
                            roomLock={isLock}
                          ></GroupBx>
                        </div>
                      ) : (
                        //비로그인 : 방입장불가
                        <div
                          className="groupbx_card"
                          onClick={() => {
                            window.alert("로그인 후 입장하실 수 있습니다.");
                            history.push("/login");
                          }}
                        >
                          <GroupBx
                            key={p.idx}
                            {...p}
                            bgcolor={bgcolor}
                            roomLock={isLock}
                          ></GroupBx>
                        </div>
                      )}
                    </>
                  );
                }
              })}
          </div>

          <div className="groupreco_more_btn" onClick={seeMore}>
            <button>더보기</button>
          </div>
        </>
      ) : (
        <>
          <div className="groupreco_bottom">
            {cateSlice() &&
              cateSlice().map((p, idx) => {
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
                let roomLock = p.isStarted;
                let isLock = "";
                if (roomLock === 1) {
                  // 잠긴 방
                  isLock = "cloudy_bg";
                  return (
                    <>
                      <div className="groupbx_card">
                        <GroupBx
                          key={p.idx}
                          {...p}
                          bgcolor={bgcolor}
                          roomLock={isLock}
                        ></GroupBx>
                      </div>
                    </>
                  );
                } else {
                  return (
                    <>
                      <div
                        className="groupbx_card"
                        onClick={() => {
                          history.push("/video/" + roomlist[idx].roomId);
                        }}
                      >
                        <GroupBx
                          key={p.idx}
                          {...p}
                          bgcolor={bgcolor}
                          roomLock={isLock}
                        ></GroupBx>
                      </div>
                    </>
                  );
                }
              })}
          </div>

          <div className="groupreco_more_btn" onClick={seeMore}>
            <button>더보기</button>
          </div>
        </>
      )}
    </div>
  );
};

export default GroupRecommend;

const SearchTab = styled.button`
  padding: 0 0.8vw;
  border: 1px solid #adadad;
  border-radius: 3vw;
  background-color: #fff;
  color: #000;
  font-size: 0.8vw;
  &:active,
  &:hover,
  &:focus {
    background: #889cf2;
    color: #fff;
    font-weight: bold;
    border: 1px solid #889cf2;
  }
`;
