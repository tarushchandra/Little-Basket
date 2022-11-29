import axios from "axios";
import jwt_decode from "jwt-decode";
import { getRefreshToken } from "./getRefreshToken";
import Cookies from "js-cookie";

export const axiosCookie = axios.create({
  withCredentials: true,
  credentials: "include",
});

export const axiosIntercept = axios.create();

axiosIntercept.interceptors.request.use(
  async (config) => {
    let currentDate = new Date();
    if (Cookies.get("access_token")) {
      const decodedToken = jwt_decode(Cookies.get("access_token"));
      console.log("decoded token - ", decodedToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        console.log("token expired");
        const data = await getRefreshToken(decodedToken._id);
        console.log("new access token retrieved - ", data.accessToken);
        config.headers["access_token"] = data.accessToken;
        Cookies.set("access_token", data.accessToken);
      }
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
