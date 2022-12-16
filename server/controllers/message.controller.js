const catchAsync = require('../utils/catch.async');
const factory = require('./handler.factory');
const AppError = require('../utils/app.error');
const { StatusCodes } = require('http-status-codes');
const Message = require('../models/message.model');
const Conversation = require('../models/conversation.model');

exports.addMessage = catchAsync(async (req, res, next) => {
  const message = await Message.create({
    conversationId: req.body.conversationId,
    senderId: req.user.id,
    text: req.body.text
  });
  res.status(200).json({ status: 'success', message });
});

exports.getMessages = catchAsync(async (req, res, next) => {
  const messages = await Message.find({ conversationId: req.params.conversationId });
  res.status(200).json({ status: 'success', messages });
});
