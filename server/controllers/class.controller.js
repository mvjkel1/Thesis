const Class = require("./../models/class.model");
const catchAsync = require("./../utils/catch.async");
const AppError = require("./../utils/app.error");
const User = require("./../models/user.model");
const factory = require("./handler.factory");
const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  console.log(file.mimetype);
  // if (file.mimetype.startsWith("image")) {
  //   cb(null, true);
  // } else {
  //   cb(new AppError("Please upload only images.", 400), false);
  // }
};

const upload = multer({
  storage: multerStorage,
  // fileFilter: multerFilter,
});

exports.uploadClassFiles = upload.fields([
  {
    name: "imageCover",
    maxCount: 1,
  },
  { name: "files", maxCount: 20 },
]);

exports.resizeClassImageCover = catchAsync(async (req, res, next) => {
  // if (!req.files.imageCover || !req.files.files) return next();

  // Cover image
  if (req.files.imageCover) {
    req.body.imageCover = `class-${req.params.id}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
      .resize(1280, 720)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`public/img/classes/imageCover/${req.body.imageCover}`);
  }
  // else if (req.files.files) {
  //   req.body.files = [];
  //   // Other files
  //   await Promise.all(
  //     req.files.files.map(async (file, idx) => {
  //       console.log(file);
  //       const filename = `class-file-${req.params.id}-${Date.now()}-${idx + 1}`;
  //       await sharp(file.buffer).toFile(`public/img/classes/files/${filename}`);
  //       req.body.files.push(filename);
  //     })
  //   );
  // }
  next();
});

exports.setUserGroupId = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user.group) {
    return next(new AppError("You have to be member of a group.", 401));
  }
  if (!req.body.group) req.body.group = user.group._id;
  next();
});

exports.createClass = factory.createOne(Class);
exports.updateClass = factory.updateOne(Class);
exports.getClass = factory.getOne(Class, { path: "group" });
exports.getAllClasses = factory.getAll(Class, { path: "group" });
exports.deleteClass = factory.deleteOne(Class);
