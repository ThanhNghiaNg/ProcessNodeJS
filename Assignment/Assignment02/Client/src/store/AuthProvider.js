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
    return { ...state, isLoggedIn: true, userId: action.userId };
  } else if (action.type === LOGOUT) {
    return { isLoggedIn: false, userId: "" };
  } else {
    return { ...state };
  }
};

function AuthProvider(props) {
  const [auth, dispatch] = useReducer(AuthReducer, initState);

  const loginHandler = (userId) => {
    localStorage.setItem("IS_LOGGED_IN", "true");
    localStorage.setItem("USER_ID", userId);
    dispatch({ type: LOGIN, userId });
  };

  const logoutHandler = () => {
    localStorage.removeItem("IS_LOGGED_IN");
    localStorage.removeItem("USER_ID");
    dispatch({ type: LOGOUT });
  };

  const value = {
    isLoggedIn: auth.isLoggedIn,
    userId: auth.userId,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export default AuthProvider;
