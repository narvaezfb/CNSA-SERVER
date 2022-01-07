const express = require("express");
const gameTypeController = require("./../Controllers/gameTypeController");
const router = express.Router();

router.route("/").get(gameTypeController.getAllGameTypes);

module.exports = router;
