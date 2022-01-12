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

  const [roomcount, setRoomcount] = React.useState(6);
  
  const [activeCate, setActiveCate] = React.useState("All");
  const [roomPurpose, setRoomPurpose] = React.useState(0);


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
  //console.log(roomPurpose,"번 카테고리 리스트",_roomlist,caterooms);

  const seeMore = () => {
    setRoomcount(roomcount + roomcount);
  };
  
  React.useEffect(() => { 
    dispatch(roomActions.getRooms());
  }, []);

  React.useEffect(() => {
  
    dispatch(roomActions.sortRooms(roomPurpose));

  }, [roomPurpose]);
  //console.log(roomPurpose,"카테고리별 방 확인 ",caterooms);
  return (
    <div className="groupreco_bx">
      <div className="groupreco_top">
        {user? (<h2>닉네임님을 위한 스터디룸 추천</h2>):(<h2>뽀모님을 위한 스터디룸 추천</h2>)}

        <div className="groupreco_search">
          <div className="hashtag_list_bx">
            <SearchTab name="0" onClick={()=>{setRoomPurpose(0)}}>ALL</SearchTab>
            <SearchTab name="1" onClick={()=>{setRoomPurpose(1)}}>자율학습</SearchTab>
            <SearchTab name="2" onClick={()=>{setRoomPurpose(2)}}>시험공부</SearchTab>
            <SearchTab name="3" onClick={()=>{setRoomPurpose(3)}}>수능공부</SearchTab>
            <SearchTab name="4" onClick={()=>{setRoomPurpose(4)}}>자격증</SearchTab>
            <SearchTab name="5" onClick={()=>{setRoomPurpose(5)}}>공무원</SearchTab>
            <SearchTab name="6" onClick={()=>{setRoomPurpose(6)}}>기타</SearchTab>
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

      {roomPurpose === 0 ? (
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
            let isLock = "";
            if (roomLock === 1) {
              // 잠긴 방
              isLock = "cloudy_bg";
              return (
                <>
                  <div
                    className="groupbx_card"
                    // onClick={() => {
                    //   history.push("/video/" + roomlist[idx].roomId);
                    // }}
                  >
                    <GroupBx
                      key={idx}
                      {...p}
                      bgcolor={bgcolor}
                      roomLock={isLock}
                    ></GroupBx>
                  </div>
                </>
              );
            } else if (roomLock === 0) {
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

      ):(
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
                  <div
                    className="groupbx_card"
                    onClick={() => {
                      // history.push("/video/" + roomlist[idx].roomId);
                    }}
                  >
                    <GroupBx
                      key={idx}
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

      ) }
    </div>
  );
};

export default GroupRecommend;

const SearchTab = styled.button`

padding: 10px 18px;
border: 1px solid #ADADAD;
border-radius:50px;
background-color: #fff;
color:#000;
font-size:14px;

&:active,
&:hover,
&:focus {
  background: #889cf2;
  color:#fff;
  font-weight:bold; 
  border:1px solid #889cf2; 
}

:first-child &:active {
  background: #889cf2;
  color:#fff;
  font-weight:bold; 
  border:1px solid #889cf2; 
}


`;
