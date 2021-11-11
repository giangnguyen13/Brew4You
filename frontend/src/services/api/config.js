import axios from "axios";

const baseURL =
  process.env.REACT_APP_ENV === "production"
    ? "/api"
    : "http://127.0.0.1:5000/api";

export const api = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    "X-Requested-Width": "XMLHttpRequest",
    "Content-Type": "application/json",
  },
});
