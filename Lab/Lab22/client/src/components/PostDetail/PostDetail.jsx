import classes from "./PostDetail.module.css";
import React from "react";

function PostDetai(props) {
  const post = props.post;
  console.log(post);
  const date = new Date(post.dateCreate).toLocaleString("us").split(" ")[1];
  return (
    <div className={`text-center ${classes.detail}`}>
      <h1>{post.title}</h1>
      <p className="text-secondary fw-bold mb-5 pb-3 border-bottom">
        Created by {post.user.name} on {date}
      </p>
      <img src={post.imageUrl} alt="" />
      <p>{post.content}</p>
    </div>
  );
}

export default PostDetai;
