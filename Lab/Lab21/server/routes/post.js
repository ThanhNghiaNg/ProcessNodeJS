const express = require("express");
const route = express.Router();
const postController = require("../controllers/post");
const isAuth = require("../middlewares/is-auth");

route.get("/posts", postController.getPosts);
route.post("/post", isAuth, postController.addPost);
route.get("/post/:id", postController.getPost);
route.put("/post/:id", isAuth, postController.editPost);
route.delete("/post/:id", isAuth, postController.deletePost);

module.exports = route;
