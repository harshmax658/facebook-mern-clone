const Post = require("../../../models/post");
const Comment = require("../../../models/comment");
const Like = require("../../../models/like");

const createComment = async (request, response) => {
  try {
    const findPost = await Post.findById(request.body.post._id);

    if (findPost) {
      const comment = new Comment({
        content: request.body.comment,
        post: findPost._id,
        user: request.user._id,
      });
      await comment.save();

      findPost.comments.push(comment);
      await findPost.save();
      console.log(comment);

      const newComment = await Comment.findById(comment.id).populate("user");
      return response.status(200).json({
        Message: "Comment Add",
        data: newComment,
      });
    }
    return response.status(400).json({
      Message: "Invalid",
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      Message: "Internal Server Error",
    });
  }
};

const deleteComment = async (request, response) => {
  try {
    const deleteComment = await Comment.findById(request.params.id);

    if (deleteComment && request.user.id == deleteComment.user) {
      await Post.findByIdAndUpdate(deleteComment.post, {
        $pull: { comments: request.params.id },
      });
      deleteComment.remove();
      await Like.deleteMany({ likable: request.params.id });
      return response.status(200).json({
        message: "comment deleted",
      });
    } else {
      return response.status(400).json({
        message: "not Found or you don't have permission",
      });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "Internal Server",
    });
  }
};
module.exports = { createComment, deleteComment };
