const express = require("express");
const router = express.Router();

const user = require("./user");
const post = require("./post");
const home = require("./home");
const comments = require("./comments");
const like = require("./like");
const friendship = require("./friendship");
const message = require("./message");

router.use("/user", user);
router.use("/post", post);
router.use("/home", home);
router.use("/comments", comments);
router.use("/like", like);
router.use("/friendship", friendship);
router.use("/message", message);

module.exports = router;
