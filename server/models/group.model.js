const mongoose = require("mongoose");
const User = require("./user.model");

const groupSchema = new mongoose.Schema(
  {
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

groupSchema.pre(/^find/, function (next) {
  this.populate({
    path: "founder",
    select: "-__v -group",
  });
  next();
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
