const User = require("../models/user.model");
const catchAsync = require("./../utils/catch.async");
const factory = require("./handler.factory");
const multer = require("multer");
const sharp = require("sharp");
const AppError = require("./../utils/app.error");
const { StatusCodes } = require("http-status-codes");
const multerStorage = multer.memoryStorage();
const uploadFile = require("../utils/upload.file");

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      new AppError("Please upload only images.", StatusCodes.BAD_REQUEST),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = uploadFile;

exports.postUserPhoto = catchAsync(async (req, res, next) => {
  const dbObject = {
    file_key: req.key, // Aws long name
    file_name: req.filename, // Original name, with extension
    mimetype: req.mimetype,
    userId: req.user._id,
    timestamp: Date.now(),
  };

  const user = await User.findById(req.user.id);
  if (!user)
    return next(new AppError("User not found.", StatusCodes.BAD_REQUEST));
  req.body.photo = dbObject;
  next();
});

exports.updateMe = catchAsync(async (req, res) => {
  let { name, email, photo } = req.body;
  console.log(req.body);
  const user = Object.assign(
    req.user,
    JSON.parse(JSON.stringify({ name, email, photo }))
  );
  if (req.file) user.photo = req.file.filename;
  await user.save({ validateModifiedOnly: true });
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined!",
  });
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateUser = factory.updateOne(User); // don't update user password
exports.getUser = factory.getOne(User, { path: "group" });
exports.getAllUsers = factory.getAll(User, { path: "group" });
exports.deleteUser = factory.deleteOne(User);
