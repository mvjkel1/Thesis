const Class = require("./../models/class.model");
const catchAsync = require("./../utils/catch.async");
const AppError = require("./../utils/app.error");
const User = require("./../models/user.model");
const factory = require("./handler.factory");

exports.createClass = catchAsync(async (req, res, next) => {
  const newClass = await Class.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      class: newClass,
    },
  });
});

exports.getAllClasses = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.groupId) {
    filter = { groupId: req.params.groupId };
  }
  const classes = await Class.find(filter).populate("group");
  res.status(201).json({
    status: "success",
    results: classes.length,
    data: {
      classes,
    },
  });
});

exports.getClass = catchAsync(async (req, res, next) => {
  const class_ = await Class.findById(req.params.id);
  res.status(201).json({
    status: "success",
    data: {
      class: class_,
    },
  });
});

exports.setUserGroupId = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  console.log(user);
  if (!user.group) {
    return next(new AppError("You have to be member of a group.", 401));
  }
  if (!req.body.group) req.body.group = user.group.id;
  next();
});

exports.createClass = factory.createOne(Class);
exports.updateClass = factory.updateOne(Class);
exports.deleteClass = factory.deleteOne(Class);
