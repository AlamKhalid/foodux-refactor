import { combineReducers } from "@reduxjs/toolkit";
import homeReducer from "./slices/home";
import userReducer from "./slices/user";

export default combineReducers({
  home: homeReducer,
  user: userReducer,
});
