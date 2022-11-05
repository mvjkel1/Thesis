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

exports.getGroup = catchAsync(async (req, res, next) => {
  const group = await Group.findById(req.params.id).populate();
  res.status(201).json({
    status: "success",
    data: {
      group,
    },
  });
});

exports.getAllGroups = catchAsync(async (req, res, next) => {
  const groups = await Group.find();
  res.status(201).json({
    status: "success",
    results: groups.length,
    data: {
      groups,
    },
  });
});

exports.deleteGroup = factory.deleteOne(Group);
