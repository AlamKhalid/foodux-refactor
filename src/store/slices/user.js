import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    token: null,
    isAuthenticated: false,
  },
  reducers: {
    loginUser: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = jwtDecode(action.payload.token);
      localStorage.setItem("token", action.payload.token);
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = {};
      state.token = null;
      localStorage.removeItem("token");
    },
    isLoggedIn: (state) => {
      const token = localStorage.getItem("token");
      if (token) {
        state.isAuthenticated = true;
        state.token = token;
        state.user = jwtDecode(token);
      }
    },
  },
});

export const { loginUser, logoutUser, isLoggedIn } = userSlice.actions;

export const getUser = (state) => state.user;

export default userSlice.reducer;
