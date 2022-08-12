const mongoose = require("mongoose");

const friendSchema = mongoose.Schema(
  {
    // sender id

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    friendId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Friend = mongoose.model("Friend", friendSchema);

module.exports = Friend;
