const Group = require("./../models/group.model");
const catchAsync = require("./../utils/catch.async");

exports.createGroup = catchAsync(async (req, res, next) => {
  const newGroup = await Group.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      group: newGroup,
    },
  });
});

exports.getAllGroups = catchAsync(async (req, res, next) => {
  const groups = await Group.find();
  res.status(201).json({
    status: "success",
    results: groups.length,
    data: {
      groups,
    },
  });
});
