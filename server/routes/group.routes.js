const express = require("express");
const groupController = require("../controllers/group.controller");
const router = express.Router();

router.post("/create", groupController.createGroup);
module.exports = router;
