const Class = require("./../models/class.model");
const catchAsync = require("./../utils/catch.async");
const AppError = require("./../utils/app.error");
const User = require("./../models/user.model");
const factory = require("./handler.factory");
const uploadClassItem = require("./../utils/upload.file");

exports.uploadClassItem = uploadClassItem;

exports.postClassItem = catchAsync(async (req, res, next) => {
  const dbObject = {
    file_key: req.key, // Aws long name
    file_name: req.filename, // Original name, with extension
    mimetype: req.mimetype,
    userId: req.user._id,
    timestamp: Date.now(),
  };

  const class_ = await Class.findById(req.params.id);
  if (!class_)
    return next(new AppError("Class not found.", StatusCodes.BAD_REQUEST));

  class_.documents.push(dbObject);
  const originalnames = req.files.map((file) => file.originalname);
  class_.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "success",
    message: "Uploaded " + req.files.length + " documents.",
  });
});

exports.setUserGroupId = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user.group) {
    return next(
      new AppError(
        "You have to be member of a group.",
        StatusCodes.UNAUTHORIZED
      )
    );
  }
  if (!req.body.group) req.body.group = user.group._id;
  next();
});

exports.createClass = factory.createOne(Class);
exports.updateClass = factory.updateOne(Class);
exports.getClass = factory.getOne(Class, { path: "group" });
exports.getAllClasses = factory.getAll(Class, { path: "group" });
exports.deleteClass = factory.deleteOne(Class);
