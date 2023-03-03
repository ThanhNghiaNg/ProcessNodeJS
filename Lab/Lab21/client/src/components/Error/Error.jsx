import classes from "./Error.module.css";
import Card from "../UI/Card";

import React from "react";

function Error({ error }) {
  return (
    <Card className={classes.error}>
      <span>{error}</span>
    </Card>
  );
}

export default Error;
