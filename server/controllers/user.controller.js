const User = require("../models/user.model");
const catchAsync = require("./../utils/catch.async");
const AppError = require("./../utils/app.error");
const { findByIdAndUpdate } = require("../models/user.model");

const filterObj = (obj, ...allowedFields) => {
  const object = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      object[el] = obj[el];
    }
  });
  return object;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users: users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  // Tour.findOne({ _id: req.params.id })

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const { name, email, photo } = req.body;
  const user = Object.assign(
    req.user,
    JSON.parse(JSON.stringify({ name, email, photo }))
  );
  await user.save({ validateModifiedOnly: true });
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

exports.deleteMe = async (req, res, next) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
