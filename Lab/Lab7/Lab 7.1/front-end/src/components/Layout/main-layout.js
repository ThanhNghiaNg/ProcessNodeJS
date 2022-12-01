import { NavLink } from "react-router-dom";
import "./main.css";

const Layout = (props) => {
  return (
    <main>
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
        </nav>
      </header>
      {props.children}
    </main>
  );
};

export default Layout;
