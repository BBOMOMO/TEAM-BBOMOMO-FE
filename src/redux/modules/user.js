import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { setToken } from "../../shared/token";
import apis from "../../shared/apis";

// actions
const SET_USER = "SET_USER";
const ID_CHECK = "ID_CHECK";
const NICK_CHECK = "NICK_CHECK";

// action creators
const setUser = createAction(SET_USER, (userInfo) => ({ userInfo }));
const idCheck = createAction(ID_CHECK, (idCheckres) => ({ idCheckres }));
const nickCheck = createAction(NICK_CHECK, (nickCheckres) => ({
  nickCheckres,
}));

// initialState
const initialState = {
  userInfo: null,
  userDetail: {},
  idCk: null,
  nickCk: null,
};

const registerDB = (name, pwd, pwdck, nickname, category) => {
  return async function (dispatch, getState, { history }) {
    const userInfo = {
      username: name,
      password: pwd,
      passwordConfirm: pwdck,
      nick: nickname,
      category: category,
    };

    await apis
      .register(userInfo)
      .then(function (response) {
        window.alert("회원가입 성공 🔥");
        history.push("/login");
      })
      .catch((err) => {
        const message = err;
        console.log(message);
        window.alert(message);
      });
  };
};

// 아이디 중복확인
const idCheckDB = (name) => {
  return async function (dispatch, getState, { history }) {
    const idInfo = {
      username: name,
    };

    await apis
      .registerID(idInfo)
      .then(function (response) {
        // console.log(response);
        dispatch(idCheck(response.data));
      })
      .catch((err) => {
        //console.log(err.response.data.result);
        dispatch(idCheck(err.response.data));
      });
  };
};

// 닉네임 중복확인
const nickCheckDB = (nickname) => {
  return async function (dispatch, getState, { history }) {
    const nickInfo = {
      nick: nickname,
    };

    await apis
      .registerNICK(nickInfo)
      .then(function (response) {
        dispatch(nickCheck(response.data));
      })
      .catch((err) => {
        //console.log(err.response.data.result);
        dispatch(nickCheck(err.response.data));
      });
  };
};

// 로그인
const loginDB = (username, password) => {
  return async function (dispatch, getState, { history }) {
    const userInfo = {
      username,
      password,
    };
    await apis
      .login(userInfo)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        setToken("login", token);
        window.alert("로그인 성공 🔥");
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        window.alert("아이디 / 비밀번호를 확인해주세요! 🥸");
      });
  };
};

//유저확인
const checkUserDB = () => {
  return async function (dispatch, getState, { history }) {
    await apis
      .checkUser()
      .then((response) => {
        //console.log(response);
        const userInfo = response.data;

        console.log(userInfo);
        const userId = userInfo.user[0].userId;
        const userNick = userInfo.user[0].nick;
        const statusMsg = userInfo.user[0].statusMsg;
        localStorage.setItem("id", `${userId}`);
        localStorage.setItem("nick", `${userNick}`);
        localStorage.setItem("statusMsg", `${statusMsg}`);
        dispatch(setUser(userInfo));
        dispatch(nickCheck(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//상태명 수정하기
const statMsgDB = (valueName) => {
  return async function (dispatch, getState, { history }) {
    const userMsg = {
      statusMsg: valueName,
    };
    await apis
      .changeMsg(userMsg)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
};

//유저정보수정
const changeInfo = (nickname, category) => {
  return async function (dispatch, getState, { history }) {
    const userInfo = {
      nick: nickname,
      category: category,
    };
    await apis
      .changeNick(userInfo)
      .then((response) => {
        window.alert("ok");
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      });
  };
};

//---- reducer ----
export default handleActions(
  {
    [ID_CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.idCk = action.payload.idCheckres.result;
      }),
    [NICK_CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.nickCk = action.payload.nickCheckres.result;
      }),
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo = action.payload.userInfo;

        //자꾸 에러떠서 각각 지정
        draft.userId = action.payload.userInfo.user[0].userId;
        draft.userNick = action.payload.userInfo.user[0].nick;
        draft.userCate = action.payload.userInfo.user[0].category;
        draft.studyTime = action.payload.userInfo.todayRecord[0].today;
        //console.log(action.payload.userInfo.user[0].nick)
      }),
  },
  initialState
);

export const actionCreators = {
  registerDB,
  loginDB,
  checkUserDB,
  idCheckDB,
  nickCheckDB,
  changeInfo,
  statMsgDB,
};
