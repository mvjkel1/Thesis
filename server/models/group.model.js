const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A group must have a name"],
    unique: true,
  },
  founder: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A group must have a founder"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  users: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
});

groupSchema.pre(/^find/, function (next) {
  this.populate({
    path: "founder users",
    select: "-__v -group",
  });
  next();
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
