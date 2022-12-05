const express = require("express");
const groupController = require("../controllers/group.controller");
const authController = require("../controllers/auth.controller");
const classRouter = require("./../routes/class.routes");

const router = express.Router();

router.use("/:groupId/classes", classRouter);

router
  .route("/")
  .get(groupController.getAllGroups)
  .post(authController.protect, groupController.createGroup);

router
  .route("/my-groups")
  .get(authController.protect, groupController.getMyGroup);

router
  .route("/:id")
  .get(authController.protect, groupController.getGroup)
  .delete(
    authController.protect,
    authController.restrictTo("group-representative", "admin"),
    groupController.removeAllClassesBasedOnGroup,
    groupController.deleteGroup,
    groupController.discardGroupFounder
  )
  .patch(
    authController.protect,
    authController.restrictTo("group-representative", "admin"),
    groupController.updateGroup
  )
  .post(authController.protect, groupController.joinGroup);

module.exports = router;
