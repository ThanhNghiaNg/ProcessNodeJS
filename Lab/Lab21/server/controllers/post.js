exports.getPosts = (req, res, next) => {};
exports.getPost = (req, res, next) => {};

exports.addPost = (req, res, next) => {
  const { title, content } = req.body;
  const image = req.file;
};

exports.editPost = (req, res, next) => {};
exports.deletePost = (req, res, next) => {};
