const express = require("express");
const app = express();
const port = 8001;
const passport = require("passport");
const path = require("path");

app.use(express.json());

require("./config/mongoose/config");

// chat socket

const server = require("http").createServer(app);

require("./config/socket.io/chat_socket").chatSocket(server);

// cookieParser
const cookieParser = require("cookie-parser");

app.use(cookieParser());

// jwt authentication
require("./config/passport/passport-jwt");
app.use(passport.initialize());
const routersPath = path.join(__dirname, "/routes");

app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(require(routersPath));

server.listen(port, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(`server is up and running on http://localhost:${port}`);
});
