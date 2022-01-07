const express = require("express");
const statisticsController = require("../Controllers/playerStatisticsController");
const router = express.Router();

router
  .route("/")
  .get(statisticsController.getPlayerStatistics)
  .post(statisticsController.createPlayerStatistics);

module.exports = router;