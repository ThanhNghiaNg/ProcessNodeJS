import classes from "./Header.module.css";
import Container from "../UI/Container";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";
import { useEffect } from "react";
import useHttp from "../../hooks/useHttp";
import { serverUrl } from "../../utils/constant";

const Header = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const username = useSelector((state) => state.auth.name);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sendRequest } = useHttp();

  const logoutHandler = () => {
    sendRequest({ url: `${serverUrl}/logout`, method: "POST" }, (data) => {
      console.log(data);
      dispatch(authActions.logout());
      navigate("/login", { replace: true });
    });
  };

  return (
    <Container className={classes.header}>
      <div className={classes.group}>
        <NavLink
          className={({ isActive }) => (isActive ? classes.active : " ")}
          to="/"
          end
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? classes.active : " ")}
          to="/shop"
        >
          Shop
        </NavLink>
      </div>
      <div className={classes.group}>BOUTIQUE</div>
      <div className={classes.group}>
        <div className={classes["nav-icon"]}>
          <span className={classes["icon-header"]}>
            <i className="fa-solid fa-cart-shopping"></i>
          </span>
          <NavLink
            className={({ isActive }) => (isActive ? classes.active : " ")}
            to="/cart"
            end
          >
            Cart
          </NavLink>
        </div>
        <div className={classes["nav-icon"]}>
          {!isLoggedIn && (
            <NavLink
              className={({ isActive }) => (isActive ? classes.active : " ")}
              to="/login"
              end
            >
              Login
            </NavLink>
          )}
          {isLoggedIn && (
            <div className={classes["nav-icon"]}>
              <NavLink
                className={({ isActive }) => (isActive ? classes.active : " ")}
                to="/history"
              >
                <span className={classes["icon-header"]}>
                  <i className="fa-solid fa-receipt"></i>
                </span>

                <span className="ms-1 me-2">History</span>
              </NavLink>
              <NavLink>
                <span className={classes["icon-header"]}>
                  <i className="fa fa-user" aria-hidden="true"></i>
                </span>
                <span className="ms-1">{username + " "}</span>
                <i className="fa fa-caret-down me-2"></i>
              </NavLink>
              <NavLink
                to="/login"
                className={classes.logout}
                onClick={logoutHandler}
              >
                (Logout)
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Header;

// import AuthContext from "./..";
// import React, { useContext } from "react";

// const ListenedComponent = (props) => {
//   const authCtx = useContext(AuthContext);
//   return <nav>{authCtx.isLoggedIn}</nav>;
// };

// const AuthContext = React.createContext({
//   isLoggedIn: false,
//   login: (email, password) => {},
//   logout: () => {},
// });

// export const AuthProvider = (props) => {
//   const loginHandler = (email, password) => {
//     {logic}
//   };
//   const logoutHandler = (email, password) => {
//     {logic;}
//   };
//   return (
//     <AuthContext.Provider
//       value={{
//         isLoggedIn: false,
//         login: (email, password) => {},
//         logout: () => {},
//       }}
//     >
//       {props.children}
//     </AuthContext.Provider>
//   );
// };

// // export default AuthContext

// import AuthProvider from '../'

// <AuthProvider><App/></AuthProvider>
