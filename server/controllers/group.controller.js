const Group = require("./../models/group.model");
const asyncHandler = require("express-async-handler");

exports.createGroup = asyncHandler(async (req, res, next) => {
  const newGroup = await Group.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      group: newGroup,
    },
  });
});

exports.getAllGroups = asyncHandler(async (req, res, next) => {
  const groups = await Group.find();
  res.status(201).json({
    status: "success",
    results: groups.length,
    data: {
      groups,
    },
  });
});
