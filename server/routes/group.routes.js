const express = require("express");
const groupController = require("../controllers/group.controller");
const authController = require("../controllers/auth.controller");
const classRouter = require("./../routes/class.routes");

const router = express.Router();

router.use("/:groupId/classes", classRouter);

router
  .route("/")
  .get(groupController.getAllGroups)
  .get(groupController.getGroup)
  .post(authController.protect, groupController.createGroup);

router
  .route("/:id")
  .get(groupController.getGroup)
  .delete(groupController.deleteGroup);

module.exports = router;
