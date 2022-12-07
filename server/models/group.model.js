const mongoose = require("mongoose");
const crypto = require("crypto");

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
    inviteToken: String,
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

groupSchema.methods.createInviteToken = function () {
  const token = crypto.randomBytes(32).toString("hex");
  this.inviteToken = crypto.createHash("sha256").update(token).digest("hex");
  console.log(token);
  return token;
};

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
