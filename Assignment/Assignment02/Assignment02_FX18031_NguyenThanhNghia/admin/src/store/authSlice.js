import { createSlice } from "@reduxjs/toolkit";

const initState = {
  token: localStorage.getItem("USER_ID") || "",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
      localStorage.setItem("USER_ID", action.payload);
    },
    logout(state) {
      state.token = "";
      localStorage.removeItem("USER_ID");
    },
  },
});

export const authActions = AuthSlice.actions;
export default AuthSlice.reducer;
