import classes from "./PostModal.module.css";
import { createPortal } from "react-dom";
import Card from "../UI/Card";
import React, { useState } from "react";

function Backdrop(props) {
  return (
    <div className={classes.backdrop} onClick={props.onClick}>
      {props.children}
    </div>
  );
}

function Modal(props) {
  const [imageSrc, setImageSrc] = useState("");

  function handleFileSelect(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      setImageSrc(reader.result);
    };
  }
  return (
    <Backdrop>
      <Card className={classes.modal}>
        <form>
          <h3>New Post</h3>
          <div className="mt-3">
            <label className="text-uppercase mb-1">title</label>
            <input type="text" className="form-control" />
          </div>
          <div className="mt-3">
            <label className="text-uppercase mb-1">image</label>
            <input
              type="file"
              className="form-control"
              onChange={handleFileSelect}
            />
          </div>
          <div className={`mt-3 ${classes["display-img"]}`}>
            {!imageSrc && (
              <label className="mb-1">Please choose an image</label>
            )}
            {imageSrc && <img src={imageSrc}></img>}
          </div>
          <div className="mt-3">
            <label className="text-uppercase mb-1">content</label>
            <input type="text" className="form-control" />
          </div>
          <div className="d-flex justify-content-end mt-5">
            <button
              onClick={props.onClose}
              className={`btn btn-outline-danger me-2`}
            >
              CANCEL
            </button>
            <button className={`btn btn-outline-primary`}>ACCEPT</button>
          </div>
        </form>
      </Card>
    </Backdrop>
  );
}

function PostModal(props) {
  return (
    <>
      {createPortal(
        <Modal edit={props.edit} onClose={props.onClose} />,
        document.getElementById("modal")
      )}
    </>
  );
}

export default PostModal;
