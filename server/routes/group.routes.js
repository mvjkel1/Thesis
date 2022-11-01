const express = require("express");
const groupController = require("../controllers/group.controller");
const authController = require("../controllers/auth.controller");
const router = express.Router();

router.route("/").get(groupController.getAllGroups).post(
  authController.protect,
  // authController.restrictTo("admin", "class-representative"),
  groupController.createGroup
);

module.exports = router;
