import { createReducer, createSlice } from "@reduxjs/toolkit";

const initState = {
  token: localStorage.getItem("TOKEN") || "",
  role: localStorage.getItem("ROLE") || "",
  isLoggedIn: localStorage.getItem("IS_LOGGED_IN") || false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("TOKEN", action.payload.token);
      localStorage.setItem("IS_LOGGED_IN", "true");
      localStorage.setItem("ROLE", action.payload.role);
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      localStorage.removeItem("TOKEN");
      localStorage.removeItem("IS_LOGGED_IN");
      localStorage.removeItem("ROLE");
      state.role = "";
      state.token = "";
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
