import classes from "./Sidebar.module.css";
import { NavLink, useMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

function Sidebar() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };
  return (
    <div className={classes.sidebar}>
      <span className={classes.section__label}>main</span>
      <ul>
        <li className={useMatch("/") && classes.active}>
          <NavLink to="/">
            <i className="fa-solid fa-table-columns"></i> Dashboard
          </NavLink>
        </li>
      </ul>
      <span className={classes.section__label}>lists</span>
      <ul>
        <li className={useMatch("/users") && classes.active}>
          <NavLink to="/users">
            <i className="fa-regular fa-user"></i> Users
          </NavLink>
        </li>
        <li className={useMatch("/hotels") && classes.active}>
          <NavLink to="/hotels">
            <i className="fa-solid fa-hotel"></i> Hotels
          </NavLink>
        </li>
        <li className={useMatch("/rooms") && classes.active}>
          <NavLink to="/rooms">
            <i className="fa-solid fa-door-open"></i> Rooms
          </NavLink>
        </li>
        <li className={useMatch("/transactions") && classes.active}>
          <NavLink to="/transactions">
            <i className="fa-solid fa-truck"></i> Transactions
          </NavLink>
        </li>
      </ul>
      <span className={classes.section__label}>new</span>
      <ul>
        <li className={useMatch("/add-hotel") && classes.active}>
          <NavLink to="/add-hotel">
            <i className="fa-solid fa-hotel"></i> New Hotel
          </NavLink>
        </li>
        <li className={useMatch("/add-room") && classes.active}>
          <NavLink to="/add-room">
            <i className="fa-solid fa-door-open"></i> New Room
          </NavLink>
        </li>
      </ul>
      <span className={classes.section__label}>user</span>
      <ul>
        <li>
          <NavLink to="/" onClick={logoutHandler}>
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
