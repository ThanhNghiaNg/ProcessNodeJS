import React from "react";
import PostForm from '../components/PostForm/PostForm'
import PostList from '../components/PostList/PostList'

function Home(props) {
  return <div>
    <PostForm/>
    <PostList/>
  </div>;
}

export default Home;
