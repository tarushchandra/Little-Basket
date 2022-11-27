import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    isError: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.isError = true;
    },
    logoutSuccess: (state) => {
      state.currentUser = null;
      state.isError = false;
      state.isFetching = false;
    },
  },
});

export const { loginFailure, loginStart, loginSuccess, logoutSuccess } =
  userSlice.actions;
export default userSlice.reducer;
