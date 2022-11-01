const Class = require("./../models/class.model");
const catchAsync = require("./../utils/catch.async");
const AppError = require("./../utils/app.error");
const User = require("./../models/user.model");

exports.createClass = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user.group) {
    return next(new AppError("You have to be member of a group.", 401));
  }
  if (!req.body.group) req.body.group = user.group.id;
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
  if (req.params.group) {
    filter = { group: req.params.group };
  }
  const classes = await Class.find().populate("group");
  res.status(201).json({
    status: "success",
    results: classes.length,
    data: {
      classes,
    },
  });
});

exports.deleteClass = catchAsync(async (req, res, next) => {
  const class_ = await Class.findByIdAndDelete(req.params.id);

  if (!class_) {
    return next(new AppError("No class found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
