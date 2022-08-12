module.exports.chatSocket = (socketServer) => {
  const io = require("socket.io")(socketServer);

  io.on("connection", (socket) => {
    console.log("New Connection received", socket.id);

    socket.on("disconnect", () => console.log("chat close"));

    socket.on("user_join", (data) => {
      console.log("Joining request receive => " + data.user_id);
      socket.join(data.user_id);
    });
    socket.on("send_message", (data) => {
      io.to(data.receiver._id).emit("recieve_message", data);
    });
  });
};
