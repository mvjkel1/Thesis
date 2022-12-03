const User = require("../models/user.model");
const catchAsync = require("./../utils/catch.async");
const factory = require("./handler.factory");
const multer = require("multer");
const sharp = require("sharp");
const AppError = require("./../utils/app.error");

const multerStorage = multer.memoryStorage();

const multerFilter = (file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  req.file.filename = `${req.file.fieldname}-${uniqueSuffix}.jpeg`;
  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 95 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

exports.updateMe = catchAsync(async (req, res) => {
  let { name, email, photo } = req.body;
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
