const express = require("express");
const router = express.Router();
const passport = require("passport");
const { toggleLike } = require("../../../controllers/api/v1/likes_api");

router.post(
  "/toggle",
  passport.authenticate("jwt", { session: false }),
  toggleLike
);

module.exports = router;
