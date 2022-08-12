const Post = require("../../../models/post");

const User = require("../../../models/user");
const Comment = require("../../../models/comment");
const Like = require("../../../models/like");

const createNewPost = async (request, response) => {
  try {
    const user = await User.findById(request.user._id);

    Post.uploadPostImage(request, response, async (error) => {
      if (error) {
        console.log(error);
        return response.status(400).json({
          msessage: "error while createing a post",
        });
      }

      let post;
      console.log(request.file);
      if (request.file) {
        console.log("request.file");
        post = new Post({
          content: request.body.content,
          user: request.user,
          image: Post.PostImagePath + "/" + request.file.filename,
        });
      } else {
        post = new Post({
          content: request.body.content,
          user: request.user,
        });
      }

      await post.save();
      user.posts = [post._id, ...user.posts];

      await user.save();
      return response.status(200).json({
        message: "Post Created",
        data: post,
      });
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const destroyPost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);
    const user = await User.findById(request.user.id);
    console.log(post.user);
    console.log(request.user.id);
    console.log(request.user._id === post.user);

    if (post && user.id == post.user) {
      await Comment.deleteMany({ post: post._id });
      await Like.deleteMany({ likable: post._id });
      user.posts.pull(post._id);
      await user.save();

      post.remove();

      return response.status(200).json({
        message: "Post delete succesfully",
      });
    }
    return response.status(400).json({
      message: "Invalid",
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "Internal Server Error",
    });
  }
};
module.exports = { createNewPost, destroyPost };
