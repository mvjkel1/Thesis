const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const conversationSchema = new mongoose.Schema(
  {
    members: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
