const Semester = require("./../models/semester.model");
const User = require("./../models/user.model");
const catchAsync = require("./../utils/catch.async");

exports.createGroup = catchAsync(async (req, res, next) => {
  const newSemester = await Semester.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      semester: newSemester,
    },
  });
});

exports.getSemester = catchAsync(async (req, res, next) => {
  const semester = await Semester.findById(req.params.id).populate();
  res.status(201).json({
    status: "success",
    data: {
      semester,
    },
  });
});

exports.getAllSemesters = catchAsync(async (req, res, next) => {
  const semesters = await Semester.find();
  res.status(201).json({
    status: "success",
    results: semesters.length,
    data: {
      semesters,
    },
  });
});
