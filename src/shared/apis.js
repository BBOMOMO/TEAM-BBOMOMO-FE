import axios from "axios";
import { getToken } from "./token";
const accessToken = document.cookie.split("=")[1];
const instance = axios.create({
  baseURL: "http://54.180.107.194/",
});

instance.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json; charset=utf-8";
  // 기본 content-type이 json이라 뒤에 따로 명시 안해도 되지만, 불안해서 명시함
  config.headers["X-Requested-With"] = "XMLHttpRequest";
  config.headers["Authorization"] = getToken("login")
    ? `${getToken("login")}`
    : "";
  config.headers.Accept = "application/json";
  return config;
});
// 토큰을 헤더에 담아드릴지 자동으로 토큰으로 넘겨드릴지 백엔드분들에게 여쭤보기

export const apis = {
  //---- 유저  ----
  login: (userInfo) => instance.post("/api/v1/auth/login", userInfo), //로그인
  checkUser: () => instance.get(`/api/v1/users/mypage`), //유저확인
};

export default apis;
