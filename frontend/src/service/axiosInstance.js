import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5002",
  headers: {
    Accept: "application/json",
  },
});

const requestHandler = (request) => {
  if (!request.headers) {
    request.headers = {};
  }
  request.headers.Authorization = `Bearer ${Cookies.get("token")}`;
  return request;
};

axiosInstance.interceptors.request.use(requestHandler, (error) =>
  Promise.reject(error)
);

export default axiosInstance;
