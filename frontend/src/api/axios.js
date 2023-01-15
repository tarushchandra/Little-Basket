import axios from "axios";
import jwt_decode from "jwt-decode";
import { getRefreshToken } from "./getRefreshToken";

export const axiosCookie = axios.create({
  withCredentials: true,
});

export const axiosIntercept = axios.create();

axiosIntercept.interceptors.request.use(
  async (config) => {
    let currentDate = new Date();
    if (localStorage.getItem("access_token")) {
      const decodedToken = jwt_decode(localStorage.getItem("access_token"));
      console.log("decoded token - ", decodedToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        console.log("token expired");
        const data = await getRefreshToken(decodedToken._id);
        console.log("new access token retrieved - ", data.accessToken);
        config.headers["access_token"] = data.accessToken;
        localStorage.setItem("access_token", data.accessToken);
      }
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
