const { v4: uuidv4 } = require("uuid");
const aws = require("aws-sdk");
const s3 = new aws.S3();
const multer = require("multer");
const sharp = require("sharp");

function resizeImage(imageBuffer) {
  return sharp(imageBuffer).resize(400).jpeg({ quality: 50 }).toBuffer();
}

const pushToS3 = (data, key) => {
  return new Promise((resolve, reject) =>
    s3.upload(
      {
        Bucket: "studentshare",
        Key: key,
        ACL: "public-read",
        Body: data,
      },
      (err, data) => {
        if (err) reject(err);
        else resolve(data);
      }
    )
  );
};

const uploadItem = (req, res, next) => {
  const imageFormats = /jpeg|jpg|png|gif/;
  const documentFormats = /pdf|docx/;
  if (!req.files[0]) {
    return next();
  }
  req.key = uuidv4();
  req.filename = req.files[0].originalname;
  req.mimetype = req.files[0].mimetype;
  let file;
  if (imageFormats.test(req.files[0].mimetype))
    file = resizeImage(req.files[0].buffer);
  else if (documentFormats.test(req.files[0].mimetype))
    file = new Promise((res) => res(req.files[0].buffer));
  file
    .then((data) => {
      pushToS3(data, req.key);
    })
    .then(() => next())
    .catch((error) => res.status(400).json({ message: error }));
};

module.exports = uploadItem;
