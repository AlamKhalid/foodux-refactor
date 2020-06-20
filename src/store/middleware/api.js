import { createAction } from "@reduxjs/toolkit";
import axios from "axios";

export default ({ dispatch, getState }) => (next) => async (action) => {
  if (action.type === "api/callBegan") {
    const { url, data, method, onStart, onSuccess, onError } = action.payload;
    if (onStart) dispatch({ type: onStart });
    next(action);
    try {
      const response = await axios.request({
        baseURL: "http://localhost:5000/api",
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
