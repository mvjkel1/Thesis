const Class = require("./../models/class.model");
const catchAsync = require("./../utils/catch.async");
const AppError = require("./../utils/app.error");
const User = require("./../models/user.model");
const factory = require("./handler.factory");
const multer = require("multer");
const sharp = require("sharp");

const imageCoverStorage = multer.memoryStorage();

const classDocumentsStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/class/documents/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const imageCoverMulterFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const uploadImage = multer({
  storage: imageCoverStorage,
  fileFilter: imageCoverMulterFilter,
});

const uploadDocument = multer({
  storage: classDocumentsStorage,
});

exports.uploadClassImageCover = uploadImage.single("imageCover");
exports.uploadClassDocuments = uploadDocument.any("documents");

exports.resizeClassImageCover = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `class-cover-${req.params.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(1152, 864)
    .toFormat("jpeg")
    .jpeg({ quality: 95 })
    .toFile(`public/class/imageCover/${req.file.filename}`);
  next();
});

exports.postClassDocuments = catchAsync(async (req, res, next) => {
  const class_ = await Class.findById(req.params.id);
  const originalnames = req.files.map((file) => file.originalname);
  class_.documents.push(originalnames.toString());
  class_.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "success",
    message: "Uploaded " + req.files.length + " documents.",
  });
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
