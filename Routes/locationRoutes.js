const express = require("express");
const locationController = require("../Controllers/locationController");
const router = express.Router();

router
  .route("/")
  .get(locationController.getAllLocations)
  .post(locationController.createLocation);

router
  .route("/:id")
  .get(locationController.getOneLocation)
  .patch(locationController.updateLocation)
  .delete(locationController.deleteLocation);

module.exports = router;
