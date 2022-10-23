const Class = require("./../models/class.model");
const catchAsync = require("./../utils/catch.async");

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
