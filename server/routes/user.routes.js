const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/get/userList", [authJwt.verifyToken], controller.getUserList);
  app.get("/api/get/changeUserStatus", [authJwt.verifyToken], controller.changeUserStatus);
  app.get("/api/get/deleteUser", [authJwt.verifyToken], controller.deleteUser);

};
