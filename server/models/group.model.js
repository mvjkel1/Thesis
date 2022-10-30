const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A group must have a name"],
    unique: true,
  },
  founder: {
    type: String,
    required: [true, "A group must have a founder"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
