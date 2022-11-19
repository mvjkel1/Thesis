const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const express = require("express");
const router = express.Router();

// Actual user routes
router
  .get("/logout", authController.logout)
  .post("/login", authController.login)
  .post("/signup", authController.signup)
  .post("/forgot-password", authController.forgotPassword)
  .patch("/reset-password/:token", authController.resetPassword)
  .patch(
    "/update-password",
    authController.protect,
    authController.updatePassword
  )
  .patch(
    "/update-me",
    authController.protect,
    userController.uploadUserPhoto,
    userController.resizeUserPhoto,
    userController.updateMe
  )
  .delete("/delete-me", authController.protect, userController.deleteMe);

router.get(
  "/me",
  authController.protect,
  userController.getMe,
  userController.getUser
);

// router.use(authController.restrictTo("admin"));
// System administrator routes
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route("/:id")
  .get(userController.getUser)
  .delete(userController.deleteUser)
  .patch(userController.updateUser);

module.exports = router;
