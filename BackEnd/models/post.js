const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const POST_PATH = path.join("/uploads/post");

const postSchema = mongoose.Schema(
  {
    content: {
      type: String,
    },
    image: {
      type: String,
      default: null,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const storage = multer.diskStorage({
  destination: function (request, file, cb) {
    cb(null, path.join(__dirname, "..", POST_PATH));
  },
  filename: function (request, file, cb) {
    const uniqueSuffix = Date.now() + "-" + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// static Methods
postSchema.statics.uploadPostImage = multer({ storage: storage }).single(
  "image"
);
postSchema.statics.PostImagePath = POST_PATH;

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
