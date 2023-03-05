import classes from "./PostForm.module.css";
import React, { useState } from "react";
import PostModal from "../Modal/PostModal";

function PostForm(props) {
  const [showModal, setShowModal] = useState(false);
  const onClodeModal = () => {
    setShowModal(false);
  };
  const newPostHandler = () => {
    setShowModal(true);
  };
  return (
    <>
      <div className="mx-auto my-3 w-50 d-flex flex-column align-items-center">
        <div>
          <input type="text" defaultValue="I am new!" className="rounded" />
          <button className="btn">UPDATE</button>
        </div>
        <button
          className="btn btn-outline-warning"
          onClick={newPostHandler}
          type="button"
        >
          NEW POST
        </button>
      </div>
      {showModal && <PostModal edit={false} onClose={onClodeModal} />}
    </>
  );
}

export default PostForm;
