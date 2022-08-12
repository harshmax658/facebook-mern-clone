const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    messages: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Message",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;
