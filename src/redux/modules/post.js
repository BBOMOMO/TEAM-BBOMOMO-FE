import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
// import { setToken } from "../../shared/token";

import apis from "../../shared/apis";

// actions
const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";

// action creators
const loadPosts = createAction(GET_POST, (postList) => ({ postList }));
const addPosts = createAction(ADD_POST, (newPost) => ({ newPost }));

// initialState
const initialState = {
  postList: [],
};

// middlewares
const getPosts = () => {
  return async function (dispatch, useState, { history }) {
    await apis.getPost().then(function (response) {
      console.log("getroom", response.data);
      dispatch(loadPosts(response));
    });
  };
};
const addPost = (nick, postContent, studyTime, file, bgtype) => {
  return async function (dispatch, useState, { history }) {
    console.log(nick, postContent, studyTime, file, bgtype);
    console.log(typeof file);
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
        console.log(response);
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
      }),
    [ADD_POST]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

export const actionCreators = {
  addPost,
  getPosts,
};
