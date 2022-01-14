import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { setToken, setKakao } from "../../shared/token";
import apis from "../../shared/apis";
import api from "../../api/api";

// actions
const SET_USER = "SET_USER";
const ID_CHECK = "ID_CHECK";
const NICK_CHECK = "NICK_CHECK";
const ADD_USER_IMG = "ADD_USER_IMG";
const GET_RANK = "GET_RANK";
// action creators
const setUser = createAction(SET_USER, (userInfo) => ({ userInfo }));
const idCheck = createAction(ID_CHECK, (idCheckres) => ({ idCheckres }));
const nickCheck = createAction(NICK_CHECK, (nickCheckres) => ({
  nickCheckres,
}));
const addUserImg = createAction(ADD_USER_IMG, (userImg) => ({ userImg }));
const getRank = createAction(GET_RANK, (studyRanking) => ({
  studyRanking,
}));

// initialState
const initialState = {
  userInfo: null,
  userDetail: {},
  idCk: null,
  nickCk: null,
  studyRanking: null,
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

//kakao social 로그인
const kakaoLogin = (authorization_code) => {
  return async function (dispatch, getState, { history }) {
    await api
      .get(`/api/v1/auth/kakao/callback?code=${authorization_code}`)
      .then((response) => {
        console.log(response.data.user.token);
        const token = response.data.user.token;
        
        setKakao( token);//쿠키에 저장     
       localStorage.setItem("token", `${token}`);//로컬스토레지에 토큰저장

     

        //window.alert("카카오 로그인 성공 🔥");
        //history.push("/");
       
      })
      .catch((err) => {
        console.log("카카오 로그인실패", err);
       
      
      });
  };
};

// //kakao social 로그인
// const kakaoLogin = (authorization_code) => {
//   return async function (dispatch, getState, { history }) {
//     await apis
//       .kakao(authorization_code)
//       .then((response) => {
//         console.log(response);
//         //const token = response.data.user.token;
        
//        // setToken("kakao", token);//쿠키에 저장     
//        // localStorage.setItem("token", `${token}`);//로컬스토레지에 토큰저장

//         //localStorage.setItem("nick", `${userNick}`);
//         //localStorage.setItem("statusMsg", `${statusMsg}`);

//         //window.alert("카카오 로그인 성공 🔥");
//         //history.push("/");
//       })
//       .catch((err) => {
//         console.log("카카오 로그인실패", err.response);
//         window.alert("로그인에 실패하였습니다.");
//         //history.replace("/login"); // 로그인 실패하면 로그인화면으로 돌려보냄
//       });
//   };
// };

//유저확인
const checkUserDB = () => {
  return async function (dispatch, getState, { history }) {
    await apis
      .checkUser()
      .then((response) => {
        // console.log(response);
        const userInfo = response.data;

        console.log(userInfo);
        const userId = userInfo.user.userId;
        const userNick = userInfo.user.nick;
        const statusMsg = userInfo.user.statusMsg;
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
        //console.log(response);
        window.alert("수정 완료되었습니다.");
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
        console.log(response);
        window.alert("수정 완료되었습니다.");
        apis.checkUser().then((response) => {
          dispatch(setUser(response.data));
        });
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      });
  };
};

//프로필이미지 수정
const changeImgDB = (file) => {
  return async function (dispatch, getState, { history }) {
    const form = new FormData();

    form.append("file", file);

    await apis
      .changeImg(form)
      .then((response) => {
        window.alert("수정 완료되었습니다.");
        apis.checkUser().then((response) => {
          console.log(response.data);
          dispatch(setUser(response.data));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const getRankDB = () => {
  return async function (dispatch, getState, { history }) {
    await apis
      .getRank()
      .then((response) => {
        console.log(response);
        const studyRanking = response.data.studyRanking;
        dispatch(getRank(studyRanking));
      })
      .catch((err) => {
        console.log(err);
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
        draft.userId = action.payload.userInfo.user.userId;
        draft.userNick = action.payload.userInfo.user.nick;
        draft.userCate = action.payload.userInfo.user.category;
        draft.studyTime = action.payload.userInfo.todayRecord.today;
        draft.studyTotal = action.payload.userInfo.totalRecord.total;
        //console.log(action.payload.userInfo.user[0].nick)
      }),
    [ADD_USER_IMG]: (state, action) => produce(state, (draft) => {}),
    [GET_RANK]: (state, action) =>
      produce(state, (draft) => {
        draft.studyRanking = action.payload.studyRanking;
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
  changeImgDB,
  getRankDB,
  kakaoLogin,
};
