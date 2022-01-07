const express = require("express");
const scholarshipController = require("./../Controllers/scholarshipController");
const router = express.Router();

router
  .route("/")
  .get(scholarshipController.getAllScholarships)
  .post(scholarshipController.createScholarship);

router
  .route("/:id")
  .get(scholarshipController.getOneScholarship)
  .patch(scholarshipController.updateScholarship)
  .delete(scholarshipController.deleteScholarship);

module.exports = router;
