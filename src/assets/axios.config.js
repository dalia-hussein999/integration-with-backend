import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "Application/json",
  },
});
