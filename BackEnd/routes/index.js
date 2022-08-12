const express = require("express");
const router = express.Router();
const passport = require("passport");
const api = require("./api");
const userPresent = require("../config/auth/userPresent");
const { sendUserJWTtoken } = require("../controllers/api/v1/users_api");

router.get(
  "/isUserLogged",
  userPresent,
  passport.authenticate("jwt", { session: false }),
  sendUserJWTtoken
);
router.use("/api", api);

module.exports = router;
