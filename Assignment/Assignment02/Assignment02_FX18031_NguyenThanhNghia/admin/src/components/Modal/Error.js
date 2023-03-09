import classesAlert from "./Alert.module.css";
import classes from "./Error.module.css";
import { Backdrop } from "./Alert";
import Card from "../UI/Card";
import { createPortal } from "react-dom";

function Error(props) {
  return createPortal(
    <Backdrop>
      <Card className={`${classesAlert.alert}`}>
        <h3 className="mb-5 text-secondary">
          <span className="text-danger me-3">
            <i className="fa-solid fa-triangle-exclamation"></i>
          </span>
          {props.message}
        </h3>
        <div className="d-flex">
          <button
            onClick={props.onClose}
            className={`btn btn-primary ${classes.center}`}
          >
            Close
          </button>
        </div>
      </Card>
    </Backdrop>,
    document.getElementById("modal")
  );
}

export default Error;
