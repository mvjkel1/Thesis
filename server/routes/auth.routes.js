<<<<<<< Updated upstream
const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/auth/signup", controller.signup);
  app.post("/api/auth/signin", controller.signin);
};
=======
const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
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
// .post("/api/auth/signup", controller.signup)
// .post("/api/auth/signin", controller.signin);

module.exports = router;
>>>>>>> Stashed changes
