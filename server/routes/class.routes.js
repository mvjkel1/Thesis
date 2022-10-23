const express = require("express");
const classController = require("../controllers/class.controller");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/create", classController.createClass);
// If the user is not authenticated (logged in) - he cannot getAllClasses
router.route("/").get(authController.protect, classController.getAllClasses);

module.exports = router;
