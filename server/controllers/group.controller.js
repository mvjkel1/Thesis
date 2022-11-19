const Group = require("./../models/group.model");
const User = require("./../models/user.model");
const catchAsync = require("./../utils/catch.async");
const factory = require("./handler.factory");
const AppError = require("./../utils/app.error");

exports.createGroup = catchAsync(async (req, res, next) => {
  if (!req.body.founder) req.body.founder = req.user.id;
  const newGroup = await Group.create(req.body);
  const founder = await User.findById(req.body.founder);
  founder.groups.push(newGroup._id);
  founder.role = "group-representative";
  founder.save({ validateBeforeSave: false });
  newGroup.members.push(founder);
  newGroup.save({ validateBeforeSave: false });
  res.status(201).json({
    status: "success",
    data: {
      group: newGroup,
    },
  });
});

exports.discardGroupFounder = catchAsync(async (req, res, next) => {
  const founder = await User.findById(req.user.id);
  const founderGroupIndexToRemove = founder.groups.map((obj) => obj.valueOf());
  founder.groups.splice(
    founderGroupIndexToRemove.findIndex((obj) => obj === req.params.id),
    1
  );
  if (founder.role !== "admin" && founder.groups.length === 1) {
    founder.role = "user";
  }
  founder.save({ validateBeforeSave: false });
  next();
});

exports.getMyGroups = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user.groups) return next(new AppError("You have to belong to a group."));
  const groupsIds = user.groups;
  const groups = await Group.find({ _id: { $in: groupsIds } });
  res.status(200).json({
    title: "My groups",
    groups,
  });
});

exports.updateGroup = factory.updateOne(Group);
exports.getGroup = factory.getOne(Group);
exports.getAllGroups = factory.getAll(Group);
exports.deleteGroup = factory.deleteOne(Group);
