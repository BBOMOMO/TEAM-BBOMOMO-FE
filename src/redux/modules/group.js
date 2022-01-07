import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { setToken } from "../../shared/token";

import apis from "../../shared/apis";
import { getContrastRatio } from "@material-ui/core";

// actions
const LOAD_ROOMS = "LOAD_ROOMS";
const ADD_ROOMS = "ADD_ROOMS";

// action creators
const loadRooms = createAction(LOAD_ROOMS, (room_list) => ({ room_list }));
const addRooms = createAction(ADD_ROOMS, (newRoom) => ({ newRoom }));

// initialState
const initialState = {
  roomList: [],
};

// middlewares
const getRooms = () => {
  return async function (dispatch, useState, { history }) {
    await apis.getRoom().then(function (response) {
      //console.log("getroom",response.data);
      dispatch(loadRooms(response));
    });
  };
};

const addRoom = (
  userId,
  roomTitle,
  roomStatus,
  roomPassword,
  roomPurpose,
  round,
  studyTime,
  recessTime,
  openedAt
) => {
  return async function (dispatch, useState, { history }) {
    const roomInfo = {
      roomTittle: roomTitle,
      private: roomStatus,
      roomPassword: roomPassword,
      purpose: roomPurpose,
      round: round,
      studyTime: studyTime,
      recessTime: recessTime,
      openAt: openedAt,
    };

    await apis
      .postRoom(userId, roomInfo)
      .then(async function (response) {
        console.log(response);
        console.log("방 생성 완료");
        const newRoomId = response.data.newRoomId;
        history.push(`/video/${newRoomId}`);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  };
};
const enterRoom = (newRoomId, roomPassword = null) => {
  return async function (dispatch, useState, { history }) {
    await apis
      .enterRoom(newRoomId, roomPassword)
      .then((response) => {
        console.log(response);
        console.log("enterRoom 성공");
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        history.push("/");
      });
  };
};
// reducer
export default handleActions(
  {
    [LOAD_ROOMS]: (state, action) =>
      produce(state, (draft) => {
        draft.roomList = action.payload.room_list.data;
        //draft.roomSmall =  draft.roomList.list.slice(0,6);
        //console.log("호잉", draft.roomList.list.slice(0,6));
      }),
    [ADD_ROOMS]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

export const actionCreators = {
  getRooms,
  loadRooms,
  addRoom,
  enterRoom,
};
