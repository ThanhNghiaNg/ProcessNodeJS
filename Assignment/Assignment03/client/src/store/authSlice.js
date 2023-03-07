import {  createSlice } from "@reduxjs/toolkit";

const initState = {
  token: localStorage.getItem("TOKEN") || "",
  roomId: localStorage.getItem("ROOM_ID") || "",
  isLoggedIn: localStorage.getItem("IS_LOGGED_IN") || false,
  name: localStorage.getItem("USER_NAME") || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("TOKEN", action.payload.token);
      localStorage.setItem("IS_LOGGED_IN", "true");
      localStorage.setItem("USER_NAME", action.payload.name);
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.isLoggedIn = true;
    },
    logout: (state, action) => {
      console.log("postLogout");
      localStorage.removeItem("TOKEN");
      localStorage.removeItem("IS_LOGGED_IN");
      localStorage.removeItem("USER_NAME");
      localStorage.removeItem("ROOM_ID");
      state.roomId = "";
      state.name = "";
      state.token = "";
      state.isLoggedIn = false;
    },
    createRoom: (state, action) => {
      localStorage.setItem("ROOM_ID", action.payload);
      state.roomId = action.payload;
    },
    deleteRoom: (state, action) => {
      localStorage.removeItem("ROOM_ID");
      state.roomId = "";
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
