const express = require('express');
const classController = require('../controllers/class.controller');
const authController = require('../controllers/auth.controller');
const multer = require('multer');
const router = express.Router({ mergeParams: true });
const uploadClassItem = require('../utils/upload.file');

router
  .route('/')
  .get(authController.protect, classController.getAllClasses)
  .post(authController.protect, classController.setUserGroupId, classController.createClass);

router
  .route('/:id')
  .get(authController.protect, classController.getClass)
  .post(
    authController.protect,
    multer({ limits: { fileSize: 5 * 1000 * 1000 } }).any(),
    classController.uploadClassItem,
    classController.postClassItem
  )
  .patch(authController.protect, classController.updateClass)
  .delete(
    authController.protect,
    authController.restrictTo('class-representative', 'admin'),
    classController.deleteClass
  );

module.exports = router;
