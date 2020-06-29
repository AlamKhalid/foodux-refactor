import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "./reducer";
import api from "./middleware/api";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: [...getDefaultMiddleware(), api],
});
const persistor = persistStore(store);

export default { store, persistor };
