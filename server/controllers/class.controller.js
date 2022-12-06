const Class = require("./../models/class.model");
const catchAsync = require("./../utils/catch.async");
const AppError = require("./../utils/app.error");
const User = require("./../models/user.model");
const factory = require("./handler.factory");
const multer = require("multer");
const sharp = require("sharp");
const { v4: uuidv4 } = require('uuid');
const aws = require('aws-sdk');
const s3 = new aws.S3();

const classDocumentsStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/class/documents/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

function resizeImage(imageBuffer){
  return sharp(imageBuffer)
  .resize(400)
  .jpeg({quality: 50})
  .toBuffer()
}

const imageCoverMulterFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const pushToS3 = (data, key) => {
  return new Promise((resolve, reject) => 
  s3.upload({
    Bucket: "studentshare",
    Key: key,
    ACL: 'public-read',
    Body: data
  }, (err, data) => {
    if(err) reject(err);
    else resolve(data);
  }))
}

const uploadItem = (req, res, next) => {
  const imageFormats = /jpeg|jpg|png|gif/;
  const documentFormats = /pdf|docx/;
  // Step 1: sprawdz czy jest w ogole plik (prymitywne)
  if(!req.files[0]) { return next()}
  console.log("RECEIVED FILE");
  // Step 2: wygeneruj dla niego unikalna nazwe do s3 i daj do req
  req.key = uuidv4();
  // Step 3: daj wszystkie inne wazne dane do req
  req.filename = req.files[0].originalname;
  req.mimetype = req.files[0].mimetype;
  console.log("OF NAME " + req.files[0].originalname);
  // Step 3: sprwadz format czy dozwolony, jesli obraz, zrob resize, jesli nie, zostaw
  console.log("AND OF TYPE: " + req.files[0].mimetype);
  let file;
  if(imageFormats.test(req.files[0].mimetype)) file = resizeImage(req.files[0].buffer)
  else if(documentFormats.test(req.files[0].mimetype)) file = new Promise(res => res(req.files[0].buffer))
  file
  .then((data) => {
    pushToS3(data, req.key);
  })
  .then(() => next())
  .catch(error => res.status(400).json({message: error}))
}

// Tu nie wiedzialem o co chodzilo z tym rozróznieniem, idk 
exports.uploadClassImageCover = uploadItem; //?
exports.uploadClassItem = uploadItem;

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

exports.postClassItem = catchAsync(async (req, res, next) => {
  console.log("UPLOAD OK, NOW, ADDING DB ENTRY");
  const dbObject = {
    file_key: req.key, // Aws long name
    file_name: req.filename, // Original name, with extension
    mimetype: req.mimetype,
    userId: req.user._id,
    timestamp: Date.now()
  }
  console.log(dbObject);

  // To z jakiegoś powodu nie działa, nwm, nie znam się, coś z mongo, licze ze ogarniesz :)

  /*
  const class_ = await Class.findById(req.params.id);
  class_.documents.push(dbObject);
  class_.save({ validateBeforeSave: false });
  */
  
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
