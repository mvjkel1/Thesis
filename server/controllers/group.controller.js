const Group = require("./../models/group.model");
const User = require("./../models/user.model");
const Class = require("./../models/class.model");
const catchAsync = require("./../utils/catch.async");
const factory = require("./handler.factory");
const AppError = require("./../utils/app.error");

exports.createGroup = catchAsync(async (req, res, next) => {
  if (!req.body.founder) req.body.founder = req.user.id;
  const founder = await User.findById(req.body.founder);
  if (founder.group)
    return next(new AppError("You already belong to a group.", 401));
  const newGroup = await Group.create(req.body);
  founder.group = newGroup._id;
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

exports.joinGroup = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const group = await Group.findById(req.params.id);
  if (!group) return next(new AppError("Group not found", 404));
  user.group = req.params.id;
  group.members.push(user);
  user.save({ validateBeforeSave: false });
  group.save({ validateBeforeSave: false });
  res.status(201).json({
    status: "success",
    data: {
      group,
    },
  });
});

exports.discardGroupFounder = catchAsync(async (req, res, next) => {
  const founder = await User.findById(req.user.id);
  if (founder.role !== "admin") {
    founder.role = "user";
  }
  founder.save({ validateBeforeSave: false });
  next();
});

exports.getMyGroup = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user.group) return next(new AppError("You have to belong to a group."));
  const groupId = user.group;
  const group = await Group.find({ _id: { $in: groupId } });
  res.status(200).json({
    title: "My group",
    group,
  });
});

// I may consider implementing it using pre hooks later ;).
exports.removeAllClassesBasedOnGroup = catchAsync(async (req, res, next) => {
  // Find all classes based on the group
  await Class.deleteMany({ group: req.params.id });
  next();
});

exports.updateGroup = factory.updateOne(Group);
exports.getGroup = factory.getOne(Group, { path: "classes" });
exports.getAllGroups = factory.getAll(Group, { path: "classes" });
exports.deleteGroup = factory.deleteOne(Group);
