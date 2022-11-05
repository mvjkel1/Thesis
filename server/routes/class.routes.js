const express = require("express");
const classController = require("../controllers/class.controller");
const authController = require("../controllers/auth.controller");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(authController.protect, classController.getAllClasses)
  .post(authController.protect, classController.createClass);

router
  .route("/:id")
  .get(authController.protect, classController.getClass)
  .patch(authController.protect, classController.updateClass)
  .delete(
    authController.protect,
    // authController.restrictTo("admin, class-representative"),
    classController.deleteClass
  );

module.exports = router;
