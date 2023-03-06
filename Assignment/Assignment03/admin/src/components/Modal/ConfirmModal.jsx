import classes from "./ConfirmModal.module.css";
import React from "react";
import { createPortal } from "react-dom";

export function Backdrop(props) {
  return <div className={classes.backdrop}>{props.children}</div>;
}

function Modal(props) {
  const onConfirmHandler = (event) => {
    event.preventDefault();
    props.handler();
    if (props.inform) {
      props.onClose();
    }
  };
  const closeModalHanlder = (event) => {
    event.preventDefault();
    props.onClose();
  };
  console.log(props.message);
  return (
    <Backdrop>
      <form className={classes.modal} onSubmit={onConfirmHandler}>
        <div>
          <p className="text-center fs-3">{props.message}</p>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className={`btn btn-${props.inform ? "success" : "danger"} me-2`}
            type="submit"
          >
            Yes
          </button>
          {!props.inform && (
            <button
              className="btn btn-secondary"
              type="button"
              onClick={closeModalHanlder}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </Backdrop>
  );
}

function ConfirmModal(props) {
  return (
    <>
      {createPortal(
        <Modal
          inform={props.inform}
          message={props.message}
          handler={props.handler}
          onClose={props.onClose}
        />,
        document.getElementById("modal")
      )}
    </>
  );
}

export default ConfirmModal;
