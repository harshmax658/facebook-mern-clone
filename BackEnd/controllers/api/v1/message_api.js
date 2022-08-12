const Conversation = require("../../../models/conversation");
const Message = require("../../../models/message");
const createMessage = async (request, response) => {
  try {
    const { receiver_id, sender_id, message } = request.body;
    const conversation = await Conversation.findOne({
      members: { $all: [receiver_id, sender_id] },
    });

    const msg = await Message({
      messageOwner: sender_id,
      message,
    });
    await msg.save();
    console.log(request.body);
    console.log(conversation);
    if (conversation) {
      conversation.messages.push(msg);
      await conversation.save();

      return response.status(200).json({
        message: "message send",
      });
    }
    console.log("aya");

    const newConversation = Conversation({
      members: [receiver_id, sender_id],
    });

    newConversation.messages.push(msg);
    await newConversation.save();
    console.log("newConversation");
    console.log(newConversation);
    return response.status(200).json({
      message: "message  send",
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: "Internal server error",
    });
  }
};

const getConversation = async (request, response) => {
  try {
    let chat = false;
    const { sender, receiver } = request.body;
    console.log(request.body);
    const conversation = await Conversation.findOne({
      members: { $all: [sender, receiver] },
    }).populate("messages");
    if (!conversation) {
      return response.status(404).json({
        message: "Chat not found",
        chat,
      });
    }
    console.log(conversation);
    chat = true;
    return response.status(200).json({
      message: "chat found",
      data: {
        messages: conversation.messages,
      },
      chat,
    });
  } catch (error) {
    return response.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { createMessage, getConversation };
