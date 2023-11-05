import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "Application/json",
  },
});
axiosInstance.interceptors.request.use(
  config => {
  
    const token = "TOKEN";
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);