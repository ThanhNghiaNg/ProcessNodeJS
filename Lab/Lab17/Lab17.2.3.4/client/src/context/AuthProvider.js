const { createContext, useState, useReducer } = require("react");

const initAuthContext = {
  csrfToken: "",
  idToken: localStorage.getItem("USER_TOKEN") || "",
  setToken: (token) => {},
  login: (token) => {},
  logout: () => {},
};

export const AuthContext = createContext(initAuthContext);

export const SETTOKEN = "SETTOKEN";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

const csrfReducer = (state, action) => {
  if (action.type === SETTOKEN) {
    return { ...state, csrfToken: action.payload };
  }
  if (action.type === LOGIN) {
    localStorage.setItem("USER_TOKEN", action.payload);
    return { ...state, idToken: action.payload };
  }
  if (action.type === LOGOUT) {
    localStorage.removeItem("USER_TOKEN");
    return { csrfToken: "", idToken: "" };
  }
  return { ...state };
};

const AuthProvider = (props) => {
  const [auth, dispatchAuth] = useReducer(csrfReducer, initAuthContext);
  const setToken = (token) => {
    dispatchAuth({ type: SETTOKEN, payload: token });
  };
  const loginHandler = (token) => {
    dispatchAuth({ type: LOGIN, payload: token });
  };
  const logoutHandler = () => {
    dispatchAuth({ type: LOGOUT });
  };
  const value = {
    csrfToken: auth.csrfToken,
    idToken: auth.idToken,
    setToken: setToken,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;
