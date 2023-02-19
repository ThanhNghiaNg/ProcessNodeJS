import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import classes from "./Alert.module.css";
import Card from "../UI/Card";

export function Backdrop(props) {
  return <div className={classes.backdrop}>{props.children}</div>;
}

function Alert(props) {
  const onConfirmHandler = () => {
    props.callback();
    props.onClose();
  };
  const onCancelHandler = () => {
    props.onClose();
  };

  return createPortal(
    <Backdrop>
      <Card className={classes.alert}>
        <h3 className="fs-3 text-center text-secondary mb-5">
          {props.message}
        </h3>
        <div className={classes["actions-control"]}>
          <button className="btn btn-danger" onClick={onConfirmHandler}>
            Confirm
          </button>
          <button className="btn btn-secondary" onClick={onCancelHandler}>
            Cancel
          </button>
        </div>
      </Card>
    </Backdrop>,
    document.getElementById("modal")
  );
}

export default Alert;
