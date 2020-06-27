import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../middleware/api";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    restaurants: [],
    cities: [],
    foods: [],
    loading: false,
  },
  reducers: {
    itemsRequested: (state) => {
      state.loading = true;
    },
    citiesReceived: (state, action) => {
      state.loading = false;
      state.cities = action.payload;
    },
    foodsReceived: (state, action) => {
      state.loading = false;
      state.foods = action.payload;
    },
    restaurantsReceived: (state, action) => {
      state.loading = false;
      state.restaurants = action.payload;
    },
    itemsFailed: (state) => {
      state.loading = false;
    },
  },
});

const {
  itemsRequested,
  restaurantsReceived,
  itemsFailed,
  citiesReceived,
  foodsReceived,
} = homeSlice.actions;

export const loadRestaurants = () => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: "",
      onStart: itemsRequested.type,
      onSuccess: restaurantsReceived.type,
      onError: itemsFailed.type,
    })
  );
};

export const loadCities = () => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: "/cities",
      onStart: itemsRequested.type,
      onSuccess: citiesReceived.type,
      onError: itemsFailed.type,
    })
  );
};

export const loadFoods = () => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: "/foods",
      onStart: itemsRequested.type,
      onSuccess: foodsReceived.type,
      onError: itemsFailed.type,
    })
  );
};

export const getHome = (state) => state.home;

export default homeSlice.reducer;
