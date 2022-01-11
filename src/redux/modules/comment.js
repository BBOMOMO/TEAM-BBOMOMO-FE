import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import apis from "../../shared/apis";

// actions
const GET_COMMENT = "GET_COMMENT";
// const DETAIL_POST = "DETAIL_POST";
// const DETAIL_POST_BG = "DETAIL_POST_BG";

// action creators
const loadcomments = createAction(GET_COMMENT, (commentList) => ({
  commentList,
}));

// initialState
const initialState = {
  commentList: [],
};

// middlewares
const getComments = (postId) => {
  return async function (dispatch, useState, { history }) {
    await apis.getComment(postId).then(function (response) {
      // console.log(response);
      dispatch(loadcomments(response));
    });
  };
};

const addComment = (nick, postId, comment) => {
  return async function (dispatch, useState, { history }) {
    const commentInfo = {
      nick: nick,
      postId: postId,
      comment: comment,
    };
    await apis
      .commentWrite(commentInfo)
      .then(function (response) {
        apis.getComment(commentInfo.postId).then(function (response) {
          dispatch(loadcomments(response));
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
    [GET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.commentList = action.payload.commentList.data;
        // console.log("액션", action.payload.postList.data);
        // console.log("드래프트", draft.postList);
      }),
    // [ADD_POST]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

export const actionCreators = {
  addComment,
  getComments,

  //   addPost,
  //   getPosts,
  //   detailPost,
  //   detailPostBg,
};
