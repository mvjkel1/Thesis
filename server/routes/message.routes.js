const express = require('express');
const router = express.Router();
const Message = require('../models/message.model');
const authController = require('../controllers/auth.controller');
const messageController = require('../controllers/message.controller');

router.route('/').post(authController.protect, messageController.addMessage);
router.route('/:conversationId').get(authController.protect, messageController.getMessages);

module.exports = router;
