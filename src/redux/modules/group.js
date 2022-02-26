import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { setToken } from "../../shared/token";

import apis from "../../shared/apis";
import { getContrastRatio } from "@material-ui/core";

// actions
const LOAD_ROOMS = "LOAD_ROOMS";
const ADD_ROOMS = "ADD_ROOMS";
const LOAD_CATEROOMS = "LOAD_CATEROOMS";
const GROUP_MODAL = "GROUP_MODAL";
const GROUP_ROUND = "GROUP_ROUND";
const PRIVATE_ROOM = "PRIVATE_ROOM";
const PRIVATE_STATE = "PRIVATE_STATE";
const GROUP_END_MODAL = "GROUP_END_MODAL";

// action creators
const loadRooms = createAction(LOAD_ROOMS, (room_list) => ({ room_list }));
const loadCateRooms = createAction(LOAD_CATEROOMS, (cateroom_list) => ({
  cateroom_list,
}));
const addRooms = createAction(ADD_ROOMS, (newRoom) => ({ newRoom }));
const groupModal = createAction(GROUP_MODAL, (modalState) => ({ modalState }));
const groupRound = createAction(GROUP_ROUND, (round) => ({ round }));
const privateRoom = createAction(PRIVATE_ROOM, (roomId, privateState) => ({
  roomId,
  privateState,
}));
const privateState = createAction(PRIVATE_STATE, (privateState) => ({
  privateState,
}));
const groupEndModal = createAction(GROUP_END_MODAL, (endModalState) => ({
  endModalState,
}));

// initialState
const initialState = {
  roomList: [],
  cateroom: [],
  modalState: false,
  round: 1,
  roomState: {
    roomId: null,
    privateState: false,
  },
  endModalState: false,
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
        // console.log(response);
        // console.log("방 생성 완료");
        const newRoomId = response.data.newRoomId;
        apis
          .getRoom()
          .then(function (response) {
            dispatch(loadRooms(response));
          })
          .then((response) => {
            history.push(`/video/${newRoomId}`);
          });
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  };
};

const sortRooms = (roomPurpose) => {
  return async function (dispatch, useState, { history }) {
    await apis
      .searchRoom(roomPurpose)
      .then(async function (response) {
        //console.log("response: ",response.data.list);
        dispatch(loadCateRooms(response));
      })
      .catch((err) => {
        console.log("err response: ", err.response);
      });
  };
};

const enterRoom = (newRoomId, roomPassword = null) => {
  return async function (dispatch, useState, { history }) {
    await apis
      .enterRoom(newRoomId, roomPassword)
      .then((response) => {
        //  console.log(response);
        //  console.log("enterRoom 성공");
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        window.alert("공부시간에는 방에 입장할 수 없습니다!");
        history.push("/");
      });
  };
};
const exitRoom = (roomId) => {
  return async function (dispatch, useState, { history }) {
    await apis
      .exitRoom(roomId)
      .then((response) => {
        //console.log(response);
        // console.log("exitRoom 성공");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
const roomPwCheckDB = (roomId, pwd) => {
  return async function (dispatch, useState, { history }) {
    await apis
      .roomPwCheck(roomId, { roomPassword: pwd })
      .then((response) => {
        console.log(response);
        history.push(`video/${roomId}`);
      })
      .catch((err) => {
        window.alert("비밀번호를 다시 확인해주세요");
        console.log(err);
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
    [LOAD_CATEROOMS]: (state, action) =>
      produce(state, (draft) => {
        draft.cateroom = action.payload.cateroom_list.data.list;
        //console.log("여기야 여기!",action.payload.cateroom_list.data.list)
      }),
    [ADD_ROOMS]: (state, action) => produce(state, (draft) => {}),
    [GROUP_MODAL]: (state, action) =>
      produce(state, (draft) => {
        draft.modalState = action.payload.modalState;
      }),
    [GROUP_ROUND]: (state, action) =>
      produce(state, (draft) => {
        draft.round = action.payload.round;
      }),
    [PRIVATE_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.roomState.roomId = action.payload.roomId;
        draft.roomState.privateState = action.payload.privateState;
      }),
    [PRIVATE_STATE]: (state, action) =>
      produce(state, (draft) => {
        draft.roomState.privateState = action.payload.privateState;
      }),
    [GROUP_END_MODAL]: (state, action) =>
      produce(state, (draft) => {
        draft.endModalState = action.payload.endModalState;
      }),
  },
  initialState
);

export const actionCreators = {
  getRooms,
  loadRooms,
  addRoom,
  enterRoom,
  sortRooms,
  exitRoom,
  groupModal,
  groupRound,
  privateRoom,
  roomPwCheckDB,
  privateState,
  groupEndModal,
};
