const Post = require("../../../models/post");
const homepage = async (request, response) => {
  try {
    const post = await Post.find()
      .sort("-createdAt")
      .populate([
        { path: "user" },
        { path: "likes" },
        {
          path: "comments",
          populate: ["user", "likes"],
          options: { sort: "-createdAt" },
        },
      ]);
    return response.status(200).json({
      msg: "Done",
      data: post,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = { homepage };
