const express = require("express");
const groupController = require("../controllers/group.controller");
const authController = require("../controllers/auth.controller");
const classRouter = require("./../routes/class.routes");

const router = express.Router();

router.use("/:groupId/classes", classRouter);

router
  .route("/")
  .get(groupController.getAllGroups)
  .post(
    authController.protect,
    groupController.setGroupFounder,
    groupController.createGroup
  );

router
  .route("/:id")
  .get(authController.protect, groupController.getGroup)
  .delete(authController.protect, groupController.deleteGroup)
  .patch(authController.protect, groupController.updateGroup);

module.exports = router;
