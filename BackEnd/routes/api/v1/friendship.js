const express = require("express");
const router = express.Router();
const passport = require("passport");

const { toggle } = require("../../../controllers/api/v1/friendsShip_api");

router.get("/toggle", passport.authenticate("jwt", { session: false }), toggle);

module.exports = router;
