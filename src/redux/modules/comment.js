import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import apis from "../../shared/apis";

// actions
const GET_COMMENT = "GET_COMMENT";

// action creators
const loadcomments = createAction(GET_COMMENT, (commentList) => ({
  commentList,
}));

// initialState
const initialState = {
  commentList: [],
};

// middlewares
const getCommentsDB = (postId) => {
  return async function (dispatch, useState, { history }) {
    await apis.getPostDetail(postId).then(function (response) {
      // console.log(response);
      dispatch(loadcomments(response.data.post.Comments));
    });
  };
};

const addCommentDB = (nick, postId, comment) => {
  return async function (dispatch, useState, { history }) {
    const commentInfo = {
      nick: nick,
      postId: postId,
      comment: comment,
    };
    await apis
      .commentWrite(commentInfo)
      .then(function (response) {
        apis.getPostDetail(postId).then(function (response) {
          dispatch(loadcomments(response.data.post.Comments));
        });
      })
      .catch(function (error) {
        //console.log(error);
      });
  };
};

const deleteCommentDB = (commentInfo) => {
  return async function (dispatch, useState, { history }) {
    await apis.commentDelete(commentInfo).then(function (response) {
      apis.getPostDetail(commentInfo.postId).then(function (response) {
        dispatch(loadcomments(response.data.post.Comments));
      });
    });
  };
};

const editCommentDB = (newCommentInfo) => {
  return async function (dispatch, useState, { history }) {
    console.log(newCommentInfo, 123);
    await apis.commentEdit(newCommentInfo).then(function (response) {
      console.log(response, "잘 전송함");
      apis.getPostDetail(newCommentInfo.postId).then(function (response) {
        console.log(response);
        dispatch(loadcomments(response.data.post.Comments));
      });
    });
  };
};

// reducer
export default handleActions(
  {
    [GET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.commentList = action.payload.commentList;
      }),
  },
  initialState
);

export const actionCreators = {
  loadcomments,
  addCommentDB,
  getCommentsDB,
  deleteCommentDB,
  editCommentDB,
};
