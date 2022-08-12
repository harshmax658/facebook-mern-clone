const passport = require("passport");
const express = require("express");
const router = express.Router();

const {
  createMessage,
  getConversation,
} = require("../../../controllers/api/v1/message_api");

router.post(
  "/create-message",
  passport.authenticate("jwt", { session: false }),
  createMessage
);

router.post(
  "/get-messages",
  passport.authenticate("jwt", { session: false }),
  getConversation
);
module.exports = router;
