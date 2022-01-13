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
// const getComments = (postId) => {
//   return async function (dispatch, useState, { history }) {
//     await apis.getComment(postId).then(function (response) {
//       // console.log(response);
//       dispatch(loadcomments(response));
//     });
//   };
// };

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
        apis.getComment(commentInfo.postId).then(function (response) {
          console.log(response.data);
          dispatch(loadcomments(response.data.comments));
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
        draft.commentList = action.payload.commentList;
        // draft.list.unshift(action.payload.post);
        console.log("드래프트", draft.commentList);
      }),
  },
  initialState
);

export const actionCreators = {
  loadcomments,
  addCommentDB,
};
