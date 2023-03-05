import popupReducer from "./popup";
import authReducer from "./authSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authReducer,
    popup: popupReducer,
  },
});

export default store;
