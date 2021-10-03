import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
  timeout: 10000,
  headers: {
    "X-Requested-Width": "XMLHttpRequest",
    "Content-Type": "application/json",
  },
});
