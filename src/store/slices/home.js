import { createSlice } from "@reduxjs/toolkit";
import api from "../middleware/api";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    restaurants: [],
    cities: [],
    foods: [],
    loading: false,
  },
  reducers: {
    itemRequested: (state, action) => {
      state.loading = true;
      state[action.payload.item] = action.payload.data;
    },
    itemsReceived: (state, action) => {
      state.loading = false;
    },
    itemsFailed: (state, action) => {
      state.loading = false;
    },
  },
});

const { itemRequested, itemsReceived, itemsFailed } = homeSlice.actions;

export const loadItem = () => (dispatch) => {};

export default homeSlice.reducer;
