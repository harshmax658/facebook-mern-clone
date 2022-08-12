const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  createNewPost,
  destroyPost,
} = require("../../../controllers/api/v1/post_api");

router.post(
  "/create-post",
  passport.authenticate("jwt", { session: false }),
  createNewPost
);
router.delete(
  "/delete-post/:id",
  passport.authenticate("jwt", { session: false }),
  destroyPost
);

module.exports = router;
