const { authJwt } = require("../middlewares");
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
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
  .patch("/updateMe", authController.protect, userController.updateMe);
router.delete("/deleteMe", userController.deleteMe);

// System administrator routes
router.route("/").get(userController.getAllUsers);
router.route("/:id").get(userController.getUser);
//   .post(userController.createUser);

// router
//   .route("/:id")
//   .get(userController.getUser)
//   .get(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
