const Group = require("./../models/group.model");
const User = require("./../models/user.model");
const catchAsync = require("./../utils/catch.async");
const AppError = require("./../utils/app.error");
const factory = require("./handler.factory");

exports.createGroup = catchAsync(async (req, res, next) => {
  if (!req.body.founder) req.body.founder = req.user.id;
  const newGroup = await Group.create(req.body);
  const founder = await User.findById(req.body.founder);
  founder.group = newGroup._id;
  founder.save({ validateBeforeSave: false });
  res.status(201).json({
    status: "success",
    data: {
      group: newGroup,
    },
  });
});

exports.updateGroup = factory.updateOne(Group);
exports.getGroup = factory.getOne(Group);
exports.getAllGroups = factory.getAll(Group);
exports.deleteGroup = factory.deleteOne(Group);
