import { NavLink, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { serverURL } from "../utils/global";
import "./main.css";

const Layout = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const logoutHandler = (event) => {
    event.preventDefault();
    fetch(`${serverURL}/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "xsrf-token": authCtx.csrfToken,
      },
      mode: "cors",
      body: JSON.stringify({ _csrf: authCtx.csrfToken }),
    })
      .then((result) => {
        if (result.ok) {
          authCtx.logout();
          navigate("/login");
        }
        return result.json();
      })
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <>
      <header className="main-header">
        <nav className="main-header__nav">
          <ul className="main-header__item-list">
            <li className="main-header__item">
              <NavLink to="/">Shop</NavLink>
            </li>
            <li className="main-header__item">
              <NavLink to="/cart">Cart</NavLink>
            </li>
            <li className="main-header__item">
              <NavLink to="/orders">Orders</NavLink>
            </li>
            <li className="main-header__item">
              <NavLink to="/add-product">Add Product</NavLink>
            </li>
            <li className="main-header__item">
              <NavLink to="/admin-products">Admin Products</NavLink>
            </li>
          </ul>
          <ul className="main-header__item-list">
            {!authCtx.idToken && (
              <>
                <li className="main-header__item">
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li className="main-header__item">
                  <NavLink to="/register">Register</NavLink>
                </li>
              </>
            )}
            {authCtx.idToken && (
              <li className="main-header__item">
                <Link onClick={logoutHandler}>Logout</Link>
              </li>
            )}
          </ul>
        </nav>
      </header>

      <main className="main">{props.children}</main>
    </>
  );
};

export default Layout;
