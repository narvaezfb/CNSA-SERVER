const express = require("express");
const schoolController = require("../Controllers/schoolController");
const router = express.Router();

router
  .route("/")
  .get(schoolController.getAllSchools)
  .post(schoolController.createSchool);

router
  .route("/:id")
  .get(schoolController.getOneSchool)
  .patch(schoolController.updateSchool)
  .delete(schoolController.deleteSchool);

module.exports = router;
