const express = require("express");
const classController = require("../controllers/class.controller");
const authController = require("../controllers/auth.controller");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(authController.protect, classController.getAllClasses)
  .post(
    authController.protect,
    classController.setUserGroupId,
    classController.createClass
  );

router
  .route("/:id")
  .get(authController.protect, classController.getClass)
  .patch(
    authController.protect,
    classController.uploadClassFiles,
    classController.resizeClassImageCover,
    classController.updateClass
  )
  .patch(authController.protect)
  .delete(
    authController.protect,
    authController.restrictTo("class-representative", "admin"),
    classController.deleteClass
  );

module.exports = router;
