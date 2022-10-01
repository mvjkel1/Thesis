const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const express = require("express");

const router = express.Router();

// module.exports = function (app) {
//   app.use(function (req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });
// };

router.route("/");
// .get("/api/get/userList", [authJwt.verifyToken], controller.getUserList)
// .get("/api/get/userList", [authJwt.verifyToken], controller.getUserList)
// .get(
//   "/api/get/changeUserStatus",
//   [authJwt.verifyToken],
//   controller.changeUserStatus
// )
// .get("/api/get/deleteUser", [authJwt.verifyToken], controller.deleteUser);

module.exports = router;
