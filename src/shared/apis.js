import axios from "axios";
import { getToken } from "./token";
const accessToken = document.cookie.split("=")[1];
const instance = axios.create({

  baseURL: "https://hanghaelog.shop/", // 재원님 서버주소 //나중에 https로 바꾸기
  //baseURL: "http://54.180.120.210/", // 상협님서버주소
  // baseURL: "http://54.180.107.194/", // 원래 서버주소
});

instance.interceptors.request.use((config) => {
  const TOKEN = document.cookie.split("=")[1];
  if (TOKEN) {
    config.headers["TOKEN"] = TOKEN;
  }

  config.headers["Content-Type"] = "application/json; charset=utf-8";
  // 기본 content-type이 json이라 뒤에 따로 명시 안해도 되지만, 불안해서 명시함
  config.headers["X-Requested-With"] = "XMLHttpRequest";
  config.headers["Authorization"] = getToken("login")
    ? `${getToken("login")}`
    : "";
  config.headers.Accept = "application/json";
  return config;
});

export const apis = {
  //---- 유저  ----//
  register: (userInfo) => instance.post("/api/v1/auth/signup", userInfo), //회원가입
  registerID: (idInfo) => instance.post("/api/v1/auth/nameck", idInfo), //아이디 중복확인
  registerNICK: (nickInfo) => instance.post("/api/v1/auth/nickck", nickInfo), //닉네임 중복확인
  login: (userInfo) => instance.post("/api/v1/auth/login", userInfo), //로그인
  checkUser: () => instance.get("/api/v1/users/mypage"), //유저확인
  //---- 유저 : 회원정보수정 ----//
  changeNick: (userInfo) => instance.put("/api/v1/users/info", userInfo), // 헤더 유저정보 수정
  changeMsg: (userMsg) => instance.put("/api/v1/users/status", userMsg), //마이페이지 상태메시지 수정
  changeImg: (formData) => instance.put("/api/v1/users/profileImg", formData), // 마이페이지 프로필이미지 수정

  //---- 그룹  ----//
  postRoom: (userId, roomInfo) =>
    instance.post(`api/v1/studyRoom/hostRoom`, roomInfo), //그룹추가하기
  getRoom: () => instance.get("/api/v1/studyRoom/list/all"), //그룹 리스트 불러오기
  enterRoom: (roomId, roomPassword) =>
    instance.post(`/api/v1/studyRoom/enterRoom/${roomId}`, roomPassword),

  //---- 공부인증  ----//
  getStudyTime: () => instance.get("/api/v1/posts/time"),
  postWrite: (formData) => instance.post("/api/v1/posts", formData),
  getPost: () => instance.get("/api/v1/posts"),
  getCommentNum: () => instance.get("/api/v1/posts/comments"),
  getPostdetail: () => instance.get("/api/v1/posts/:postId"),
};

export default apis;
