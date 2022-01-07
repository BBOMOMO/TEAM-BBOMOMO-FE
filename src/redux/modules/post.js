import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
// import { setToken } from "../../shared/token";

import apis from "../../shared/apis";

// actions
const GET_POST = "GET_POST";
const DETAIL_POST = "DETAIL_POST";
// const ADD_POST = "ADD_POST";

// action creators
const loadPosts = createAction(GET_POST, (postList) => ({ postList }));
const detailPost = createAction(DETAIL_POST, (idx) => ({ idx }));
// const addPosts = createAction(ADD_POST, (newPost) => ({ newPost }));

// initialState
const initialState = {
  postList: [],
  detailPost: {
    idx: null,
  },
};

// middlewares
const getPosts = () => {
  return async function (dispatch, useState, { history }) {
    await apis.getPost().then(function (response) {
      dispatch(loadPosts(response));
    });
  };
};

const addPost = (nick, postContent, studyTime, file, bgtype) => {
  return async function (dispatch, useState, { history }) {
    // console.log(nick, postContent, studyTime, file, bgtype);
    const form = new FormData();
    if (file === null) {
      form.append("nick", nick);
      form.append("postContent", postContent);
      form.append("studyTime", studyTime);
      form.append("bgtype", bgtype);
    } else {
      form.append("nick", nick);
      form.append("postContent", postContent);
      form.append("studyTime", studyTime);
      form.append("file", file);
    }

    await apis
      .postWrite(form)
      .then(function (response) {
        apis.getPost().then(function (response) {
          dispatch(loadPosts(response));
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

// reducer
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.postList = action.payload.postList.data;
        // console.log("액션", action.payload.postList.data);
        // console.log("드래프트", draft.postList);
      }),
    [DETAIL_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.detailPost.idx = action.payload.idx;
      }),
    // [ADD_POST]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

export const actionCreators = {
  addPost,
  getPosts,
  detailPost,
};
