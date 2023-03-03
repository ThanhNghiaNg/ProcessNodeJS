import classes from "./PostItem.module.css";

import React, { useState } from "react";
import Card from "../UI/Card";
import useHttp from "../../hooks/useHttp";
import { serverUrl } from "../../utils/constant";
import PostModal from "../Modal/PostModal";

function PostItem({ post, reload }) {
  const { sendRequest } = useHttp();
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => {
    setShowModal(true);
  };
  const closeModalHandler = () => {
    setShowModal(false);
  };

  const deleteHandler = () => {
    sendRequest(
      { url: `${serverUrl}/post/${post._id}`, method: "DELETE" },
      () => {
        reload();
      }
    );
  };
  console.log(post._id)
  const date = new Date(post.dateCreate).toLocaleString("us").split(", ")[1];
  return (
    <Card className={classes.item}>
      <p className="text-secondary fw-bold">
        Posted by {post.user.name} on {date}
      </p>
      <p className={`${classes.title} fs-2`}>{post.title}</p>
      <div
        className={`d-flex justify-content-end ${classes["action-controls"]}`}
      >
        <button className="btn">view</button>
        <button className="btn" onClick={showModalHandler}>
          edit
        </button>
        <button className="btn text-danger" onClick={deleteHandler}>
          delete
        </button>
      </div>
      {showModal && (
        <PostModal edit={true} id={post._id} onClose={closeModalHandler} />
      )}
    </Card>
  );
}

export default PostItem;
