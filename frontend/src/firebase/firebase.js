// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import axios from "axios";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../redux/features/userSlice";
import { axiosCookie } from "../api/axios";

// Facebook
// id - 793914295041164
// secret - 59d4ddd2e67a5cfcb553842c41dcc929
// https://little-basket-368315.firebaseapp.com/__/auth/handler

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWUC4GbSGfFcvGrShwzkF5jTvPP0IDJEg",
  authDomain: "little-basket-368315.firebaseapp.com",
  projectId: "little-basket-368315",
  storageBucket: "little-basket-368315.appspot.com",
  messagingSenderId: "133402679134",
  appId: "1:133402679134:web:0aa357a35e7f475cbbe1cf",
  measurementId: "G-LHK6WYWN08",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

export const oAuthSignIn = (dispatch, provider) => {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      console.log(result);
      const name = result.user.displayName;
      const email = result.user.email;

      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/register",
          {
            name,
            email,
          }
        );
        console.log(res);
        if (res.status === 200) {
          dispatch(loginStart());
          try {
            const res = await axiosCookie.post(
              "http://localhost:5000/auth/oAuth/login",
              {
                email,
              }
            );
            dispatch(loginSuccess(res.data));
          } catch (err) {
            dispatch(loginFailure());
            console.log(err);
          }
        }
      } catch (err) {
        console.log(err);
        if (err.response.status === 500) {
          dispatch(loginStart());
          try {
            const res = await axiosCookie.post(
              "http://localhost:5000/api/auth/oAuth/login",
              {
                email,
              }
            );
            dispatch(loginSuccess(res.data));
          } catch (err) {
            dispatch(loginFailure());
            console.log(err);
          }
        }
      }
    })
    .catch((err) => console.log(err));
};

// export const oAuthSignIn = (dispatch, provider) => {
//   signInWithPopup(auth, provider)
//     .then(async (result) => {
//       console.log(result);
//       const name = result.user.displayName;
//       const email = result.user.email;

//       try {
//         const res = await axiosCookie.post(
//           "http://localhost:5000/api/auth/oAuth/login",
//           {
//             email,
//           }
//         );
//         dispatch(loginSuccess(res.data));
//       } catch (err) {
//         dispatch(loginFailure());
//         console.log(err);
//       }
//     })
//     .catch((err) => console.log(err));
// };
