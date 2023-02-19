import classesAlert from "./Alert.module.css";
import { Backdrop } from "./Alert";
import Card from "../UI/Card";
import { createPortal } from "react-dom";

function Error(props) {
  return createPortal(
    <Backdrop>
      <Card className={classesAlert.alert}>
        <h3 className="mb-5 text-secondary">{props.message}</h3>
        <button onClick={props.onClose} className="btn btn-primary">
          Close
        </button>
      </Card>
    </Backdrop>,
    document.getElementById("modal")
  );
}

export default Error;
