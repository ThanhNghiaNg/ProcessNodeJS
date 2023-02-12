import { useReducer } from "react";
import AuthContext from "./AuthContext";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

const initState = {
  isLoggedIn: localStorage.getItem("IS_LOGGED_IN") || false,
  userId: localStorage.getItem("USER_ID") || "",
};
const AuthReducer = (state, action) => {
  if (action.type === LOGIN) {
    return { ...state, isLoggedIn: true };
  } else if (action.type === LOGOUT) {
    return { ...state, isLoggedIn: false };
  } else {
    return { ...state };
  }
};

function AuthProvider(props) {
  const [auth, dispatch] = useReducer(AuthReducer, initState);

  const loginHandler = (userId) => {
    localStorage.setItem("IS_LOGGED_IN", "true");
    localStorage.setItem("USER_ID", userId);
    dispatch({ type: LOGIN });
  };

  const logoutHandler = () => {
    localStorage.removeItem("IS_LOGGED_IN");
    localStorage.removeItem("USER_ID");
    dispatch({ type: LOGOUT });
  };

  const value = {
    isLoggedIn: auth.isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export default AuthProvider;
