import React from "react";
const AuthContext = React.createContext({
  isLoggedIn: false,
  userId: "",
  login: (userId) => {},
  logout: () => {},
});

export default AuthContext;
