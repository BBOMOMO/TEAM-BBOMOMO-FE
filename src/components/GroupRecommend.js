import React from "react";
// import styled from "styled-components";
import { Button, Input } from "../elements";
import search from "../Images/ic_header_search.png";

import GroupBx from "./GroupBx";
import {actionCreators as roomActions} from "../redux/modules/group";
import { useDispatch, useSelector} from "react-redux";

const GroupRecommend = (props) => {


  const dispatch = useDispatch();
  const _roomlist = useSelector((state) => state.group.roomList);
  const roomlist = _roomlist.list;

  console.log(roomlist);


  React.useEffect(()=>{

    dispatch(roomActions.getRooms());
  },[]);
  
  
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
        {
          roomlist && roomlist.map((p) => {
            
            return (
              <>
              <div className="groupbx_card">
                <GroupBx key={p.roomId} {...p}  ></GroupBx>
              </div>
              
              </>
            );

          })
        }
        
      </div>

      <div className="groupreco_more_btn">
        <button>더보기</button>
      </div>
    </div>
  );
};

export default GroupRecommend;
