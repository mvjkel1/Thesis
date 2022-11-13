const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const express = require("express");
const router = express.Router();

// Actual user routes
router
  .get("/logout", authController.logout)
  .post("/login", authController.login)
  .post("/signup", authController.signup)
  .post("/forgotPassword", authController.forgotPassword)
  .patch("/resetPassword/:token", authController.resetPassword)
  .patch(
    "/updatePassword",
    authController.protect,
    authController.updatePassword
  )
  .patch(
    "/updateMe",
    authController.protect,
    userController.uploadUserPhoto,
    userController.updateMe
  )
  .delete("/deleteMe", authController.protect, userController.deleteMe);

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
