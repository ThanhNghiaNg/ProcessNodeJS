import { createSlice } from "@reduxjs/toolkit";

const initState = {
  token: localStorage.getItem("TOKEN") || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("TOKEN", action.payload);
      state.token = action.payload;
    },
    logout: (state, action) => {
      localStorage.removeItem("TOKEN");
      state.token = "";
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
