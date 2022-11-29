import Cookies from "js-cookie";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { axiosCookie, axiosIntercept } from "../api/axios";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../redux/features/userSlice";
import {
  facebookProvider,
  googleProvider,
  oAuthSignIn,
  signInWithGoogle,
} from "../firebase/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, isError, currentUser } = useSelector(
    (state) => state.user
  );

  const login = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axiosCookie.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      console.log("login -", res);
      dispatch(loginSuccess(res.data));
    } catch (err) {
      dispatch(loginFailure());
      console.log(err);
    }
  };

  return (
    <div className="login">
      <div className="wrapper">
        <h1>Choose a Login Method</h1>
        <div>
          <div className="left">
            <div onClick={() => oAuthSignIn(dispatch, googleProvider)}>
              <img
                alt="svgImg"
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCA0OCA0OCI+CjxwYXRoIGZpbGw9IiNmYmMwMmQiIGQ9Ik00My42MTEsMjAuMDgzSDQyVjIwSDI0djhoMTEuMzAzYy0xLjY0OSw0LjY1Ny02LjA4LDgtMTEuMzAzLDhjLTYuNjI3LDAtMTItNS4zNzMtMTItMTIJczUuMzczLTEyLDEyLTEyYzMuMDU5LDAsNS44NDIsMS4xNTQsNy45NjEsMy4wMzlsNS42NTctNS42NTdDMzQuMDQ2LDYuMDUzLDI5LjI2OCw0LDI0LDRDMTIuOTU1LDQsNCwxMi45NTUsNCwyNHM4Ljk1NSwyMCwyMCwyMAlzMjAtOC45NTUsMjAtMjBDNDQsMjIuNjU5LDQzLjg2MiwyMS4zNSw0My42MTEsMjAuMDgzeiI+PC9wYXRoPjxwYXRoIGZpbGw9IiNlNTM5MzUiIGQ9Ik02LjMwNiwxNC42OTFsNi41NzEsNC44MTlDMTQuNjU1LDE1LjEwOCwxOC45NjEsMTIsMjQsMTJjMy4wNTksMCw1Ljg0MiwxLjE1NCw3Ljk2MSwzLjAzOQlsNS42NTctNS42NTdDMzQuMDQ2LDYuMDUzLDI5LjI2OCw0LDI0LDRDMTYuMzE4LDQsOS42NTYsOC4zMzcsNi4zMDYsMTQuNjkxeiI+PC9wYXRoPjxwYXRoIGZpbGw9IiM0Y2FmNTAiIGQ9Ik0yNCw0NGM1LjE2NiwwLDkuODYtMS45NzcsMTMuNDA5LTUuMTkybC02LjE5LTUuMjM4QzI5LjIxMSwzNS4wOTEsMjYuNzE1LDM2LDI0LDM2CWMtNS4yMDIsMC05LjYxOS0zLjMxNy0xMS4yODMtNy45NDZsLTYuNTIyLDUuMDI1QzkuNTA1LDM5LjU1NiwxNi4yMjcsNDQsMjQsNDR6Ij48L3BhdGg+PHBhdGggZmlsbD0iIzE1NjVjMCIgZD0iTTQzLjYxMSwyMC4wODNMNDMuNTk1LDIwTDQyLDIwSDI0djhoMTEuMzAzYy0wLjc5MiwyLjIzNy0yLjIzMSw0LjE2Ni00LjA4Nyw1LjU3MQljMC4wMDEtMC4wMDEsMC4wMDItMC4wMDEsMC4wMDMtMC4wMDJsNi4xOSw1LjIzOEMzNi45NzEsMzkuMjA1LDQ0LDM0LDQ0LDI0QzQ0LDIyLjY1OSw0My44NjIsMjEuMzUsNDMuNjExLDIwLjA4M3oiPjwvcGF0aD4KPC9zdmc+"
              />
              <h2>Google</h2>
            </div>
            <div onClick={() => oAuthSignIn(dispatch, facebookProvider)}>
              <img
                alt="svgImg"
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCA0OCA0OCI+CjxwYXRoIGZpbGw9IiMwMzliZTUiIGQ9Ik0yNCA1QTE5IDE5IDAgMSAwIDI0IDQzQTE5IDE5IDAgMSAwIDI0IDVaIj48L3BhdGg+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTI2LjU3MiwyOS4wMzZoNC45MTdsMC43NzItNC45OTVoLTUuNjl2LTIuNzNjMC0yLjA3NSwwLjY3OC0zLjkxNSwyLjYxOS0zLjkxNWgzLjExOXYtNC4zNTljLTAuNTQ4LTAuMDc0LTEuNzA3LTAuMjM2LTMuODk3LTAuMjM2Yy00LjU3MywwLTcuMjU0LDIuNDE1LTcuMjU0LDcuOTE3djMuMzIzaC00LjcwMXY0Ljk5NWg0LjcwMXYxMy43MjlDMjIuMDg5LDQyLjkwNSwyMy4wMzIsNDMsMjQsNDNjMC44NzUsMCwxLjcyOS0wLjA4LDIuNTcyLTAuMTk0VjI5LjAzNnoiPjwvcGF0aD4KPC9zdmc+"
              />
              <h2>Facebook</h2>
            </div>
            <div>
              <img
                alt="svgImg"
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCA0OCA0OCI+CjxwYXRoIGZpbGw9IiMwM0E5RjQiIGQ9Ik00MiwxMi40MjljLTEuMzIzLDAuNTg2LTIuNzQ2LDAuOTc3LTQuMjQ3LDEuMTYyYzEuNTI2LTAuOTA2LDIuNy0yLjM1MSwzLjI1MS00LjA1OGMtMS40MjgsMC44MzctMy4wMSwxLjQ1Mi00LjY5MywxLjc3NkMzNC45NjcsOS44ODQsMzMuMDUsOSwzMC45MjYsOWMtNC4wOCwwLTcuMzg3LDMuMjc4LTcuMzg3LDcuMzJjMCwwLjU3MiwwLjA2NywxLjEyOSwwLjE5MywxLjY3Yy02LjEzOC0wLjMwOC0xMS41ODItMy4yMjYtMTUuMjI0LTcuNjU0Yy0wLjY0LDEuMDgyLTEsMi4zNDktMSwzLjY4NmMwLDIuNTQxLDEuMzAxLDQuNzc4LDMuMjg1LDYuMDk2Yy0xLjIxMS0wLjAzNy0yLjM1MS0wLjM3NC0zLjM0OS0wLjkxNGMwLDAuMDIyLDAsMC4wNTUsMCwwLjA4NmMwLDMuNTUxLDIuNTQ3LDYuNTA4LDUuOTIzLDcuMTgxYy0wLjYxNywwLjE2OS0xLjI2OSwwLjI2My0xLjk0MSwwLjI2M2MtMC40NzcsMC0wLjk0Mi0wLjA1NC0xLjM5Mi0wLjEzNWMwLjk0LDIuOTAyLDMuNjY3LDUuMDIzLDYuODk4LDUuMDg2Yy0yLjUyOCwxLjk2LTUuNzEyLDMuMTM0LTkuMTc0LDMuMTM0Yy0wLjU5OCwwLTEuMTgzLTAuMDM0LTEuNzYxLTAuMTA0QzkuMjY4LDM2Ljc4NiwxMy4xNTIsMzgsMTcuMzIxLDM4YzEzLjU4NSwwLDIxLjAxNy0xMS4xNTYsMjEuMDE3LTIwLjgzNGMwLTAuMzE3LTAuMDEtMC42MzMtMC4wMjUtMC45NDVDMzkuNzYzLDE1LjE5Nyw0MS4wMTMsMTMuOTA1LDQyLDEyLjQyOSI+PC9wYXRoPgo8L3N2Zz4="
              />
              <h2>Twitter</h2>
            </div>
          </div>
          <div className="center">
            <div className="line"></div>
            <div className="or">OR</div>
          </div>
          <div className="right">
            <form>
              <input
                type="email"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={login} disabled={isFetching}>
                Login
              </button>
            </form>
            <div>
              <h3>Forgot Password?</h3>
              <span />
              <Link
                to="/register"
                style={{ color: "black", textDecoration: "none" }}
              >
                <h3>Register now!</h3>
              </Link>
            </div>
            {isError && <p>Invalid Credentials</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
