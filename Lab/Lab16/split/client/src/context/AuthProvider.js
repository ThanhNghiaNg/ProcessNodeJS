const { createContext, useState, useReducer } = require("react");

const initAuthContext = {
  csrfToken: "",
  setToken: (token) => {},
};

export const AuthContext = createContext(initAuthContext);

export const SETTOKEN = "SETTOKEN";
const csrfReducer = (state, action) => {
  if (action.type === SETTOKEN) {
    return { ...state, csrfToken: action.payload };
  }
  return {...state};
};

const AuthProvider = (props) => {
  const [csrf, dispatchCsrf] = useReducer(csrfReducer, initAuthContext);
  const setToken = (token) => {
    dispatchCsrf({ type: SETTOKEN, payload: token });
  };
  const value = {
    csrfToken: csrf.csrfToken,
    setToken: setToken,
  };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;
