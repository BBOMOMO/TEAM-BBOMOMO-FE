import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const url = process.env.REACT_APP_API_URL;

const api = axios.create({
 // baseURL: url
 baseURL: "http://54.180.120.210/"

// baseURL: "https://kauth.kakao.com/oauth/token"
});

export default api;
