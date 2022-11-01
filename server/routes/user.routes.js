const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const groupController = require("../controllers/group.controller");
const express = require("express");

const router = express.Router();

// Actual user routes
router
  .post("/login", authController.login)
  .post("/signup", authController.signup)
  .get("/logout", authController.logout)
  .post("/forgotPassword", authController.forgotPassword)
  .patch("/resetPassword/:token", authController.resetPassword)
  .patch(
    "/updatePassword",
    authController.protect,
    authController.updatePassword
  )
  .patch("/updateMe", authController.protect, userController.updateMe)
  .delete("/deleteMe", authController.protect, userController.deleteMe);

// System administrator routes
router.route("/").get(userController.getAllUsers);
router.route("/:id").get(userController.getUser);

module.exports = router;
