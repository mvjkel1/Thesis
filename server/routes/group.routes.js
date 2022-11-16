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
  .route("/:id")
  .get(authController.protect, groupController.getGroup)
  .delete(
    authController.protect,
    authController.restrictTo("group-representative", "admin"),
    groupController.discardGroupFounder,
    groupController.deleteGroup
  )
  .patch(
    authController.protect,
    authController.restrictTo("group-representative", "admin"),
    groupController.updateGroup
  );

router.get("/my-groups", authController.protect, groupController.getMyGroups);

module.exports = router;
