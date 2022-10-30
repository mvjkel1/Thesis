const Class = require("./../models/class.model");
const catchAsync = require("./../utils/catch.async");
const AppError = require("./../utils/app.error");

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
  const classes = await Class.find();
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
