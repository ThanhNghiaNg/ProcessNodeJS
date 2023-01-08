import classes from "./Container.module.css";
import React from "react";

const Container = (props) => {
  return (
    <div className={`${classes.container} ${props.className}`} onScroll={props.onScroll}>
      {props.children}
    </div>
  );
};

export default Container;
