import classes from "./PostModal.module.css";
import { createPortal } from "react-dom";
import Card from "../UI/Card";
import React, { useState, useEffect } from "react";
import useHttp from "../../hooks/useHttp";
import { serverUrl } from "../../utils/constant";
import Error from "../Error/Error";
function Backdrop(props) {
  return (
    <div className={classes.backdrop} onClick={props.onClick}>
      {props.children}
    </div>
  );
}

function Modal(props) {
  const [imageSrc, setImageSrc] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const edit = props.edit;
  const id = props.id;
  const { error, setError, sendRequest } = useHttp();

  useEffect(() => {
    console.log(id);
    if (id) {
      sendRequest({ url: `${serverUrl}/post/${id}` }, (data) => {
        setTitle(data.title);
        setContent(data.content);
      });
    }
  }, [id]);

  function handleFileSelect(event) {
    const file = event.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      setImageSrc(reader.result);
    };
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (!title || !content) {
      setError("You must fill out all information!");
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("content", content);

    sendRequest(
      {
        url: `${serverUrl}/post${edit ? `/${id}` : ""}`,
        method: edit ? "PUT" : "POST",
        headers: {},
        body: formData,
      },
      (data) => {
        if (props.onReload) {
          props.onReload();
        }
        props.onClose();
      }
    );
  };

  return (
    <Backdrop>
      <Card className={classes.modal}>
        {error && <Error error={error} />}
        <form onSubmit={submitHandler}>
          <h3>{edit ? "Edit" : "New"} Post</h3>
          <div className="mt-3">
            <label className="text-uppercase mb-1">title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
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
            <input
              type="text"
              className="form-control"
              value={content}
              onChange={(event) => {
                setContent(event.target.value);
              }}
            />
          </div>
          <div className="d-flex justify-content-end mt-5">
            <button
              onClick={props.onClose}
              className={`btn btn-outline-danger me-2`}
              type="button"
            >
              CANCEL
            </button>
            <button className={`btn btn-outline-primary`} type="submit">
              ACCEPT
            </button>
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
        <Modal
          edit={props.edit}
          id={props.id}
          onClose={props.onClose}
          onReload={props.onReload}
        />,
        document.getElementById("modal")
      )}
    </>
  );
}

export default PostModal;
