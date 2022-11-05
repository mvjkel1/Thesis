const Class = require("./../models/class.model");
const catchAsync = require("./../utils/catch.async");
const AppError = require("./../utils/app.error");
const User = require("./../models/user.model");
const factory = require("./handler.factory");

exports.setUserGroupId = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user.group) {
    return next(new AppError("You have to be member of a group.", 401));
  }
  if (!req.body.group) req.body.group = user.group.id;
  next();
});

exports.createClass = factory.createOne(Class);
exports.updateClass = factory.updateOne(Class);
exports.getClass = factory.getOne(Class, { path: "group" });
exports.getAllClasses = factory.getAll(Class, { path: "group" });
exports.deleteClass = factory.deleteOne(Class);
