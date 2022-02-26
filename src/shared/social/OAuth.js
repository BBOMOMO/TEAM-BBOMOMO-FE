import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const url = process.env.REACT_APP_API_URL;
const _KAKAO_ID = process.env.REACT_APP_KAKAO_ID;
const _KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
const _GOOGLE_ID = process.env.REACT_APP_GOOGLE_ID;
const _GOOGLE_REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
export const api = axios.create({
  baseURL: url,
});

//kakao social login 인가코드 받기

const KAKAO_ID = _KAKAO_ID;
//const KAKAO_REDIRECT_URI="http://localhost:3000/api/v1/auth/kakao/callback";
const KAKAO_REDIRECT_URI = _KAKAO_REDIRECT_URI;

export const KAKAO_API_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

const GOOGLE_ID = _GOOGLE_ID;

//const GOOGLE_REDIRECT_URI="http://localhost:3000/api/v1/auth/google/callback";
const GOOGLE_REDIRECT_URI = _GOOGLE_REDIRECT_URI;

export const GOOGLE_API_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile`;
