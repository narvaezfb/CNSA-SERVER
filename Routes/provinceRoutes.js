const express = require("express");
const provinceController = require("../Controllers/provinceController");
const router = express.Router();

router
  .route("/")
  .get(provinceController.getAllProvinces)
  .post(provinceController.createProvince);

router
  .route("/:id")
  .get(provinceController.getOneProvince)
  .patch(provinceController.updateProvince)
  .delete(provinceController.deleteProvince);

module.exports = router;
