const mongoose = require("mongoose");

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
    members: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

groupSchema.virtual("classes", {
  ref: "Class",
  localField: "_id",
  foreignField: "group",
});

groupSchema.pre(/^find/, function (next) {
  this.populate({
    path: "founder members",
    select: "-__v -group",
  });
  next();
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
