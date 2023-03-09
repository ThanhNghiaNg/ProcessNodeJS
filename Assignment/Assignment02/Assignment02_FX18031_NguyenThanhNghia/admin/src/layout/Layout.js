import classes from "./Layout.module.css";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

function Layout(props) {
  return (
    <div className={classes.layout}>
      <div className={classes.logo}>
        <Link to="/" />
        Admin Page
      </div>
      <div></div>
      <Sidebar/>
      <div>{props.children}</div>
    </div>
  );
}

export default Layout;
