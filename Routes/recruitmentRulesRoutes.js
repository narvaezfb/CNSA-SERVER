const express = require("express");
const recRulesController = require("./../Controllers/recruitmentRulesController");
const router = express.Router();

router
  .route("/")
  .get(recRulesController.getAllRecRules)
  .post(recRulesController.createRecRules);

router
  .route("/:id")
  .get(recRulesController.getOneRecRules)
  .patch(recRulesController.updateRecRules)
  .delete(recRulesController.deleteRecRules);

module.exports = router;
