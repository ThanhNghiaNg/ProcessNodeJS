import classes from "./Layout.module.css";
import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";

function Layout(props) {
  return (
    <div className={classes.layout}>
      <Sidebar />
      <div className="m-4">{props.children}</div>
    </div>
  );
}

export default Layout;
