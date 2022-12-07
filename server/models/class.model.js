const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "A class must have a name"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    group: {
      type: mongoose.Schema.ObjectId,
      ref: "Group",
    },
    imageCover: {
      type: String,
    },
    documents: [
      {
        file_key: String,
        file_name: String,
        mimetype: String,
        userId: mongoose.Schema.ObjectId,
        timestamp: Number,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

classSchema.pre(/^find/, function (next) {
  this.populate({
    path: "group",
  });
  next();
});
const Class = mongoose.model("Class", classSchema);

module.exports = Class;
