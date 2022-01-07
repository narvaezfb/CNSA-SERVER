const express = require("express");
const stadiumController = require("../Controllers/stadiumController");
const router = express.Router();

router
  .route("/")
  .get(stadiumController.getAllStadiums)
  .post(stadiumController.createStadium);

router
  .route("/:id")
  .get(stadiumController.getOneStadium)
  .patch(stadiumController.updateStadium)
  .delete(stadiumController.deleteStadium);

module.exports = router;
