import classes from "./Navbar.module.css";
import { Link, useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { authActions } from "../../store/authSlice";

function Navbar(props) {
  const token = useSelector((state) => state.auth.token);
  const dipatch = useDispatch();
  const loginMatch = useMatch("/login");
  const signupMatch = useMatch("/sign-up");
  const feedMatch = useMatch("/");

  const logoutHandler = () => {
    dipatch(authActions.logout());
  };
  return (
    <div className={classes.navbar}>
      <div className="btn btn-outline-light text light" to={"/"}>
        <span>MessageNode</span>
      </div>
      <div className={classes.navigation}>
        {!token && (
          <>
            <Link
              className={`btn text-light ${loginMatch ? classes.active : ""}`}
              to={"/login"}
            >
              <span>Login</span>
            </Link>
            <Link
              className={`btn text-light ${signupMatch ? classes.active : ""}`}
              to={"/sign-up"}
            >
              <span>Sign up</span>
            </Link>
          </>
        )}
        {token && (
          <>
            <Link
              className={`btn text-light ${feedMatch ? classes.active : ""}`}
              to={"/"}
            >
              <span>Feed</span>
            </Link>
            <Link
              className={`btn text-light `}
              to={"/login"}
              onClick={logoutHandler}
            >
              <span>Logout</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
