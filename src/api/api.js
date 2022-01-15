import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const url = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: url
});

export default api;
