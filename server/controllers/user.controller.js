const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
const moment = require("moment");

exports.blockUser = (req, res) => {
  let targets = [];
  req.query.id.forEach((target) => targets.push(new ObjectId(target)));
  let myquery = { _id: { $in: targets } };
  let db_connect = dbo.getDb();
  db_connect
    .collection("users")
    .update(myquery, { $set: { enabled: false } })
    .then(() => {
      res.status(200).send({ message: "success" });
    })
    .catch((err) => {
      res.status(500).send({ message: "something blew up" });
      throw err;
    });
};

exports.changeUserStatus = (req, res) => {
  let targets = [];
  Array.isArray(req.query.id)
    ? req.query.id.forEach((t) => targets.push(new ObjectId(t)))
    : targets.push(new ObjectId(req.query.id));
  dbo
    .getDb()
    .collection("users")
    .update(
      { _id: { $in: targets } },
      { $set: { enabled: req.query.active == "1" ? true : false } }
    )
    .then(() => res.status(200).send({ message: "success" }))
    .catch((err) => {
      res.status(500).send({ message: "something blew up" });
      throw err;
    });
};

exports.deleteUser = (req, res) => {
  let targets = [];
  Array.isArray(req.query.id)
    ? req.query.id.forEach((t) => targets.push(new ObjectId(t)))
    : targets.push(new ObjectId(req.query.id));
  dbo
    .getDb()
    .collection("users")
    .deleteMany({ _id: { $in: targets } })
    .then(() => res.status(200).send({ message: "success" }))
    .catch((err) => {
      res.status(500).send({ message: "something blew up" });
      throw err;
    });
};

exports.getUserList = (req, res) => {
  let db_connect = dbo.getDb();
  db_connect
    .collection("users")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.status(200).send(result);
    });
};
