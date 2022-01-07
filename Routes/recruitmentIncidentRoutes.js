const express = require("express");
const incidentController = require("./../Controllers/recruitmentIncidentController");
const router = express.Router();

router
  .route("/")
  .get(incidentController.getAllRecIncident)
  .post(incidentController.createRecIncident);

router
  .route("/:id")
  .get(incidentController.getOneRecIncident)
  .patch(incidentController.updateRecIncident)
  .delete(incidentController.deleteRecIncident);

module.exports = router;
