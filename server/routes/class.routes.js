const express = require("express");
const classController = require("../controllers/class.controller");
const authController = require("../controllers/auth.controller");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(authController.protect, classController.createClass)
  .get(authController.protect, classController.getAllClasses);

router
  .route("/:id")
  .delete(
    authController.protect,
    authController.restrictTo("admin, class-representative"),
    classController.deleteClass
  );

module.exports = router;
