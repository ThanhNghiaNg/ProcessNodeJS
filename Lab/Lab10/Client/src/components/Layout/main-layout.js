import { NavLink } from "react-router-dom";
import "./main.css";

const Layout = (props) => {
  return (
    <>
      <header className="main-header">
        <nav className="main-header__nav">
          <ul className="main-header__item-list">
            <li className="main-header__item">
              <NavLink to="/">Shop</NavLink>
            </li>
            <li className="main-header__item">
              <NavLink to="/products">Products</NavLink>
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
        </nav>
      </header>

      <main className="main">{props.children}</main>
    </>
  );
};

export default Layout;
