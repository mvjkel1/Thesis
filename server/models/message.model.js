const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Conversation'
    },
    senderId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    receiverId: {
      type: mongoose.Schema.ObjectId,
    },
    text: {
      type: String
    }
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
