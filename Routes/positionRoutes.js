const express = require("express");
const positionController = require("../Controllers/positionController");
const router = express.Router();

router
  .route("/")
  .get(positionController.getAllPositions)
  .post(positionController.createPosition);

router
  .route("/:id")
  .get(positionController.getOnePosition)
  .patch(positionController.updatePosition)
  .delete(positionController.deletePosition);

module.exports = router;
