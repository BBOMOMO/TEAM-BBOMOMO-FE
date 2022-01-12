import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import apis from "../../shared/apis";

// actions
const GET_POST = "GET_POST";
const GET_POST_DETAIL = "GET_POST_DETAIL";
// const ADD_POST = "ADD_POST";

// action creators
const loadPosts = createAction(GET_POST, (postList) => ({ postList }));
const loadPostDetail = createAction(GET_POST_DETAIL, (postListDetail) => ({
  postListDetail,
}));
// // const addPosts = createAction(ADD_POST, (newPost) => ({ newPost }));

// initialState
const initialState = {
  postList: [],
  postListDetail: {
    // postId: "",
    // nick: "",
    // postContent: "",
    // postImg: "",
    // studyTime: "",
    // createdAt: "",
    // updatedAt: "",
    // userId: "",
    // Comments: [
    //   {
    //     nick: "",
    //     comment: "",
    //     createdAt: "",
    //   },
    // ],
  },
};

// middlewares
const getPostsDB = () => {
  return async function (dispatch, useState, { history }) {
    await apis.getPost().then(function (response) {
      // console.log(response.data.board);
      dispatch(loadPosts(response));
    });
  };
};

const getPostDetailDB = (postId) => {
  return async function (dispatch, useState, { history }) {
    await apis.getPostDetail(postId).then(function (response) {
      // console.log(response.data, "postaction");
      dispatch(loadPostDetail(response.data.post));
    });
  };
};

const addPostDB = (nick, postContent, studyTime, file, bgtype) => {
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
    [GET_POST_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.postListDetail = action.payload.postListDetail;
        draft.array = action.payload.postListDetail.Comments;
        // console.log(draft.array);
      }),
  },
  initialState
);

export const actionCreators = {
  addPostDB,
  getPostsDB,
  getPostDetailDB,
};
