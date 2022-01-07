const express = require("express");
const gameController = require("./../Controllers/gameController");
const router = express.Router();

router
  .route("/")
  .get(gameController.getAllGames)
  .post(gameController.createGame);

router
  .route("/:id")
  .get(gameController.getOneGame)
  .patch(gameController.updateGame)
  .delete(gameController.deleteGame);

module.exports = router;
