const express= require("express")
const route = express.Router()
const postController = require('../controllers/post')

route.get('/posts', postController.getPosts);
route.post('/post', postController.addPost);
route.get('/post/:id', postController.getPost);
route.put('/post/:id', postController.editPost);
route.delete('/post/:id', postController.deletePost);

module.exports = route