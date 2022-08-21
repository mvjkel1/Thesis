const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const db = require("../db/conn");
const secret_key = "test";
const User = db.user;
const Role = db.role;

checkUserDBEntry = (id) => {
  let isValid = false;
  return db
    .getDb("forum")
    .collection("users")
    .findOne({ _id: ObjectId(id) })
    .then((result) => {
      if (result && result.enabled) return true;
      else return false;
    });
};

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) return res.status(403).send({ message: "No token provided!" });
  jwt.verify(token, secret_key, (err, decoded) => {
    if (err) return res.status(401).send({ message: "Unauthorized!" });
    checkUserDBEntry(decoded.id).then((result) => {
      if (result) {
        req.userId = decoded.id;
        next();
      } else return res.status(401).send({ message: "Unauthorized!" });
    });
  });
};

const authJwt = {
  verifyToken,
};

module.exports = authJwt;
