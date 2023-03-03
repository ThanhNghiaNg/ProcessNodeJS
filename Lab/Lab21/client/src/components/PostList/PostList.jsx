import classes from "./PostList.module.css";

import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import useHttp from "../../hooks/useHttp";
import { serverUrl } from "../../utils/constant";

function PostList(props) {
  const { error, setError, isLoading, sendRequest } = useHttp();
  const [posts, setPosts] = useState([]);
  const [onLoad, setOnload] = useState(false);

  useEffect(() => {
    sendRequest({ url: `${serverUrl}/posts` }, (data) => {
      setPosts(data);
    });
  }, [onLoad]);

  let postListContent;
  if (isLoading) {
    postListContent = <p className="text-center">Loading.....</p>;
  }
  if (posts.length > 0) {
    postListContent = posts.map((post) => {
      return (
        <PostItem
          key={post._id}
          post={post}
          reload={() => {
            setOnload((prev) => !prev);
          }}
        />
      );
    });
  } else if (!isLoading) {
    postListContent = <p className="text-center">No post found. </p>;
  }
  return <div>{postListContent}</div>;
}

export default PostList;
