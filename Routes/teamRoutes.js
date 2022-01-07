const express = require("express");
const teamController = require("../Controllers/teamController");
const router = express.Router();

router
  .route("/")
  .get(teamController.getAllTeams)
  .post(teamController.createTeam);

router
  .route("/:id")
  .get(teamController.getOneTeam)
  .patch(teamController.updateTeam)
  .delete(teamController.deleteTeam);

module.exports = router;
