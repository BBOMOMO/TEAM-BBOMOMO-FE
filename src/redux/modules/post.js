import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import apis from "../../shared/apis";

// actions
const GET_POST = "GET_POST";
const GET_POST_DETAIL = "GET_POST_DETAIL";

// action creators
const loadPosts = createAction(GET_POST, (postList) => ({ postList }));
const loadPostDetail = createAction(GET_POST_DETAIL, (postListDetail) => ({
  postListDetail,
}));

// initialState
const initialState = {
  postList: [],
  postListDetail: {},
};

// middlewares
// 게시글 전체 조회
const getPostsDB = () => {
  return async function (dispatch, useState, { history }) {
    await apis.getPost().then(function (response) {
      dispatch(loadPosts(response));
    });
  };
};

// 게시글 상세조회
const getPostDetailDB = (postId) => {
  return async function (dispatch, useState, { history }) {
    await apis.getPostDetail(postId).then(function (response) {
      dispatch(loadPostDetail(response.data.post));
    });
  };
};

const addPostDB = (nick, postContent, studyTime, file, bgtype) => {
  return async function (dispatch, useState, { history }) {
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
      }),
    [GET_POST_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.postListDetail = action.payload.postListDetail;
        draft.profileImg = action.payload.postListDetail.User.profileImg;
        draft.profileNick = action.payload.postListDetail.User.nick;
      }),
  },
  initialState
);

export const actionCreators = {
  addPostDB,
  getPostsDB,
  getPostDetailDB,
};
