const Class = require("./../models/class.model");
const asyncHandler = require("express-async-handler");

exports.createClass = asyncHandler(async (req, res, next) => {
  const newClass = await Class.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      class: newClass,
    },
  });
});

exports.getAllClasses = asyncHandler(async (req, res, next) => {
  const classes = await Class.find();
  res.status(201).json({
    status: "success",
    results: classes.length,
    data: {
      classes,
    },
  });
});
