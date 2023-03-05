import React from "react";
import PostDetail from "../components/PostDetail/PostDetail";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../hooks/useHttp";
import { serverUrl } from "../utils/constant";

function DetailPost(props) {
  const [post, setPost] = useState(null);
  const { isLoading, sendRequest } = useHttp();
  const id = useParams().id;
  useEffect(() => {
    if (id) {
      sendRequest({ url: `${serverUrl}/post/${id}` }, (data) => {
        setPost(data);
      });
    }
  }, [id]);
  return (
    <div>
      {isLoading && <p className="text-center">Loading...</p>}
      {post && <PostDetail post={post} />}
    </div>
  );
}

export default DetailPost;
