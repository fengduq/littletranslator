import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css"

const request = axios.create({
  baseURL: "/api",
  timeout: 2000
})

request.interceptors.request.use((config) => {
NProgress.start();
  config.headers["Content-Type"] = "application/x-www-form-urlencoded"
  return config;
});

request.interceptors.response.use(
  (response) => {
    
    if (!response.data.error_code) {
      NProgress.done();
      return response.data.trans_result;
    } else {
      const errorMsg = response.data.error_msg
      return Promise.reject(errorMsg);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);



export default request;
