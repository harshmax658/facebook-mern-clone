const Post = require("../../../models/post");
const Comment = require("../../../models/comment");
const Like = require("../../../models/like");

const toggleLike = async (request, response) => {
  // api/v1/likes/toggle/?id=""&type="Post"
  try {
    let likable;
    let isDelete = false;

    if (request.query.type === "Post") {
      likable = await Post.findById(request.query.id);
    } else {
      likable = await Comment.findById(request.query.id);
    }
    console.log(request.query);

    const isLikeExist = await Like.findOne({
      user: request.user._id,
      likeable: request.query.id,
      onModel: request.query.type,
    });
    console.log(isLikeExist);
    if (isLikeExist) {
      likable.likes.pull(isLikeExist.id);
      await likable.save();
      isLikeExist.remove();
      isDelete = true;
    } else {
      const like = new Like({
        user: request.user._id,
        likeable: request.query.id,
        onModel: request.query.type,
      });
      await like.save();
      likable.likes.push(like);
      await likable.save();
    }
    return response.status(200).json({
      message: "Request Succesfull",
      data: {
        deleted: isDelete,
      },
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { toggleLike };
