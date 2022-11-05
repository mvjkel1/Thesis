const express = require("express");
const semesterController = require("../controllers/semester.controller");
const router = express.Router();

router
  .route("/")
  .get(semesterController.getAllSemesters)
  .get(semesterController.getSemester)
  .post(semesterController.createSemester);

module.exports = router;
