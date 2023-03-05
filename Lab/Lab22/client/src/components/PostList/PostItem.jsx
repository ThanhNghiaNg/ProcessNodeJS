import classes from "./PostItem.module.css";

import React, { useState } from "react";
import Card from "../UI/Card";
import useHttp from "../../hooks/useHttp";
import { serverUrl } from "../../utils/constant";
import PostModal from "../Modal/PostModal";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function PostItem({ post, reload }) {
  const { sendRequest } = useHttp();
  const [showModal, setShowModal] = useState(false);
  const token = useSelector((state) => state.auth.token);
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
      }
    );
  };
  const date = new Date(post.dateCreate).toLocaleString("us").split(" ")[1];
  return (
    <Card className={classes.item}>
      <p className="text-secondary fw-bold">
        Posted by {post.user.name} on {date}
      </p>
      <p className={`${classes.title} fs-2`}>{post.title}</p>
      <div
        className={`d-flex justify-content-end ${classes["action-controls"]}`}
      >
        <Link to={`/post/${post._id}`} className="btn">
          View
        </Link>
        {post.user._id === token && (
          <>
            <button className="btn" onClick={showModalHandler}>
              edit
            </button>
            <button className="btn text-danger" onClick={deleteHandler}>
              delete
            </button>
          </>
        )}
      </div>
      {showModal && (
        <PostModal edit={true} id={post._id} onClose={closeModalHandler} />
      )}
    </Card>
  );
}

export default PostItem;
