const express = require("express");
const dashController = require("../Controllers/dashboardController");
const router = express.Router();

router
  .route("/")
  .get(dashController.getTotalCoaches);

module.exports = router;
