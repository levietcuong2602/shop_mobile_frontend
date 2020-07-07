import axios from "axios";

import { getToken, setToken } from "./auth";
const BASE_URL = process.env.REACT_APP_APIKEY;
// Create axios instance
const service = axios.create({
  baseURL: BASE_URL,
  timeout: 120000, // Request timeout
  responseType: "json",
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + getToken(); // Set JWT token
    }

    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response pre-processing
service.interceptors.response.use(
  (response) => {
    if (response.headers.authorization) {
      setToken(response.headers.authorization);
      response.data.token = response.headers.authorization;
    }

    return response.data;
  },
  (error) => {
    console.log("err" + error); // for debug
    if (error.message === "timeout of 10000ms exceeded") {
      error.message =
        "Mất kết nối đường truyền, vui lòng thử lại sau 30 giây...";
    } else if (error.message === "Request failed with status code 500") {
      error.message = "Lỗi thao tác dữ liệu, vui lòng thử lại sau 30 giây...";
    } else if (error.message === "Request failed with status code 403") {
      error.message = "Bạn không có quyền thực hiện thao tác này !";
    } else if (error.message === "Request failed with status code 404") {
      error.message = "Đường dẫn không tồn tại !";
    }

    // Message({
    //   message: error.message,
    //   type: "error",
    //   duration: 5 * 1000,
    //   offset: 40
    // });
    return Promise.reject(error);
  }
);

export default service;
