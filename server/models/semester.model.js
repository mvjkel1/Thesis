const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A semester must have a name"],
    unique: true,
  },
  startedAt: {
    type: Date,
    default: Date.now(),
    required: [true, "A semester must have the start date"],
  },
  finishesAt: {
    type: Date,
    default: Date.now(),
    required: [true, "A semester must have the end date"],
  },
});

const Semester = mongoose.model("Semester", semesterSchema);

module.exports = Semester;
