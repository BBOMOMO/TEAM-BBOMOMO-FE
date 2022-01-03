import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { setToken } from "../../shared/token";
import api from "../../api/api";
import apis from "../../shared/apis";

// actions
const SET_USER = "SET_USER";

// action creators
const setUser = createAction(SET_USER, (userInfo) => ({ userInfo }));

// initialState
const initialState = {
  userInfo: null,
};

const registerSQL = (name, pwd, pwdck, nickname, category) => {
  return async function (dispatch, getState, { history }) {
    const userInfo = {
      username: name,
      password: pwd,
      passwordConfirm: pwdck,
      nick: nickname,
      category: category,
    };

    await api
      .post("/api/v1/auth/signup", userInfo)
      .then(function (response) {
        history.push("/");
      })
      .catch((err) => {
        const message = err.response.data.msg;
        window.alert(message);
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
        history.push(`/main/${username}`);
      })
      .catch((err) => {
        console.log(err);
        window.alert("아이디 / 비밀번호를 확인해주세요! 🥸");
      });
  };
};

const checkUserDB = () => {
  return async function (dispatch, getState, { history }) {
    await apis
      .checkUser()
      .then((response) => {
        const userInfo = response.data;
        dispatch(setUser(userInfo));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//---- reducer ----
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo = action.payload.userInfo;
      }),
  },
  initialState
);

export const actionCreators = {
  registerSQL,
  loginDB,
  checkUserDB,
};
