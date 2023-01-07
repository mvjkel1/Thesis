const catchAsync = require('../utils/catch.async');
const factory = require('./handler.factory');
const AppError = require('../utils/app.error');
const { StatusCodes } = require('http-status-codes');
const Conversation = require('../models/conversation.model');

exports.createConversation = catchAsync(async (req, res, next) => {
  const conversation = await Conversation.create({
    members: [req.user.id, req.body.receiverId]
  });

  res.status(200).json({ status: 'success', conversation });
});

exports.userConverstations = catchAsync(async (req, res, next) => {
  // TBD: change from req.params.userId to id obtained from token...
  const conversation = await Conversation.find({
    members: { $in: [req.params.userId] }
  });

  res.status(200).json({ status: 'success', conversation });
});

exports.findConversation = catchAsync(async (req, res, next) => {
  const conversation = await Conversation.findOne({
    members: { $all: [req.user.id, req.params.secondMemberId] }
  });
  res.status(200).json({ status: 'success', conversation });
});
