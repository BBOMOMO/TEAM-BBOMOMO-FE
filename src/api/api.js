import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const url = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: "http://54.180.120.210/"
});

export default api;
