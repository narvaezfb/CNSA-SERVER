const express = require("express");
const dashController = require("../Controllers/dashboardController");
const router = express.Router();

router
  .route("/")
  .get(dashController.getTopPlayers);

module.exports = router;
