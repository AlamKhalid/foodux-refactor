import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../middleware/api";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    restaurants: [],
    cities: [],
    foods: [],
    categories: [],
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
    categoriesReceived: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
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
  categoriesReceived,
} = homeSlice.actions;

export const loadRestaurants = () => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: "users/restaurants/get",
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

export const loadCategories = () => (dispatch) => {
  dispatch(
    apiCallBegan({
      url: "/categories",
      onStart: itemsRequested.type,
      onSuccess: categoriesReceived.type,
      onError: itemsFailed.type,
    })
  );
};

export const getHome = (state) => state.home;

export default homeSlice.reducer;
