const express = require("express");
const groupController = require("../controllers/group.controller");
const router = express.Router();

router.post("/create", groupController.createGroup);
router.route("/").get(groupController.getAllGroups);

module.exports = router;
