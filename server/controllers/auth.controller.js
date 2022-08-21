const db = require("../db/conn");
const secret_key = "test";
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    avatar: "/",
    enabled: true,
    joined: new Date(),
    last_active: new Date(),
  };

  let db_connect = db.getDb();

  db_connect.collection("users").insertOne(user, function (err, result) {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "User was registered successfully!" });
  });
};

exports.signin = async (req, res) => {
  let db_connect = db.getDb();
  let myquery = { username: req.body.username };

  let user = {};

  db_connect.collection("users").findOne(myquery, function (err, user) {
    if (err) return res.status(500).send({ message: err });
    if (!user) return res.status(404).send({ message: "User Not found." });
    if (!user.enabled)
      return res.status(403).send({ message: "User blocked." });
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    var token = jwt.sign({ id: user._id }, secret_key, {
      expiresIn: 86400, // 24 hours
    });
    res.status(200).send({
      _id: user._id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  });
  db_connect
    .collection("users")
    .updateOne(myquery, { $set: { last_active: new Date() } });
};
