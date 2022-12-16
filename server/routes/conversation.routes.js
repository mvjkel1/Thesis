const express = require('express');
const router = express.Router();
const Conversation = require('../models/conversation.model');
const authController = require('../controllers/auth.controller');
const conversationsController = require('../controllers/conversation.controller');

router.route('/').post(authController.protect, conversationsController.createConversation);
router.route('/:userId').get(authController.protect, conversationsController.userConverstations);
router
  .route('/find/:firstMemberId/:secondMemberId')
  .get(authController.protect, conversationsController.findConversation);

module.exports = router;
