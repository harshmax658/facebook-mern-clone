const express = require("express");
const router = express.Router();

const { homepage } = require("../../../controllers/api/v1/home_api");

router.get("/", homepage);
module.exports = router;
