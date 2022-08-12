const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  createNewUser,
  userLogin,
  destroySession,
  getUserData,
  uploadUserProfile,
  getUserPost,
  getAllUser,
} = require("../../../controllers/api/v1/users_api");

router.post("/create-user", createNewUser);
router.post("/login", userLogin);
router.post(
  "/upload-profile-image",
  passport.authenticate("jwt", { session: false }),
  uploadUserProfile
);
router.get(
  "/get-user-data/",
  passport.authenticate("jwt", { session: false }),
  getUserData
);
router.get(
  "/destroySession",
  passport.authenticate("jwt", { session: false }),
  destroySession
);
router.get(
  "/get-posts/:id",
  passport.authenticate("jwt", { session: false }),
  getUserPost
);

router.get(
  "/get-all-user",
  passport.authenticate("jwt", { session: false }),
  getAllUser
);
module.exports = router;
