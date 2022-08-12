const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  createComment,
  deleteComment,
} = require("../../../controllers/api/v1/comments_api");

router.post(
  "/add-comment",
  passport.authenticate("jwt", { session: false }),
  createComment
);
router.delete(
  "/delete-comment/:id",
  passport.authenticate("jwt", { session: false }),
  deleteComment
);
module.exports = router;
