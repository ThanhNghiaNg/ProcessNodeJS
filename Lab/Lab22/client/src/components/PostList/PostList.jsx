import classes from "./PostList.module.css";

import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import useHttp from "../../hooks/useHttp";
import { serverUrl } from "../../utils/constant";
import openSocket from "socket.io-client";

function PostList(props) {
  const { error, setError, isLoading, sendRequest } = useHttp();
  const [posts, setPosts] = useState([]);
  const [onLoad, setOnload] = useState(false);

  useEffect(() => {
    sendRequest({ url: `${serverUrl}/posts` }, (data) => {
      setPosts(data);
      const socket = openSocket(`${serverUrl}`);
      socket.on("posts", (data) => {
        console.log(data);
        if (data.action === "create") {
          setPosts((prev) => {
            const updatedData = [...prev];
            updatedData.unshift(data.post);
            return updatedData;
          });
        }
        if (data.action === "update") {
          setPosts((prev) => {
            const updatedData = [...prev];
            const index = updatedData.findIndex((post) => {
              return post._id === data.post._id;
            });
            if (index >= 0) {
              updatedData[index] = data.post;
            }
            console.log(updatedData)
            return updatedData;
          });
        }
        if (data.action === "delete") {
          console.log(data.post);
          setPosts((prev) => {
            const prevData = [...prev];
            const updatedData = prevData.filter((post) => {
              return post._id !== data.post._id;
            });
            return updatedData;
          });
        }
      });
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
          // reload={() => {
          //   setOnload((prev) => !prev);
          // }}
        />
      );
    });
  } else if (!isLoading) {
    postListContent = <p className="text-center">No post found. </p>;
  }
  return <div>{postListContent}</div>;
}

export default PostList;
