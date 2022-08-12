const monogoose = require("mongoose");

const likeSchema = monogoose.Schema(
  {
    user: {
      type: monogoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    likeable: {
      type: monogoose.Schema.Types.ObjectId,
      required: true,
      refPath: "onModel",
    },
    onModel: {
      type: String,
      reuired: true,
      enum: ["Post", "Comment"],
    },
  },
  {
    timestamps: true,
  }
);

const Like = monogoose.model("Like", likeSchema);

module.exports = Like;
