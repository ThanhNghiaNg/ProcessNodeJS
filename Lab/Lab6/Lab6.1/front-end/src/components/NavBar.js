import { NavLink } from "react-router-dom";
import classes from "./NavBar.module.css";
const NavBar = (props) => {
  
  console.log(classes["nav-ul"]);
  return (
    <nav>
      <ul className={classes["nav-ul"]}>
        <li>
          <NavLink to="/">Enter Users</NavLink>
        </li>
        <li>
          <NavLink to="/users">Users</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
