import { createAction } from "@reduxjs/toolkit";
import axios from "axios";

export default ({ dispatch }) => (next) => async (action) => {
  if (action.type === apiCallBegan.type) {
    const { url, data, method, onStart, onSuccess, onError } = action.payload;
    if (onStart) dispatch({ type: onStart });
    next(action);
    try {
      const response = await axios.request({
        baseURL: "https://foodux-backend.herokuapp.com/api",
        url,
        method,
        data,
      });
      //Specific
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      //Specific
      if (onError) dispatch({ type: onError, payload: error.message });
    }
  } else return next(action);
};

export const apiCallBegan = createAction("api/callBegan");
