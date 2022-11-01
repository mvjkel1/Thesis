const Group = require("./../models/group.model");
const User = require("./../models/user.model");
const catchAsync = require("./../utils/catch.async");

exports.createGroup = catchAsync(async (req, res, next) => {
  const newGroup = await Group.create(req.body);
  const founder = await User.findById(req.user.id);
  if (!founder.group) {
    founder.group = newGroup._id;
    newGroup.founder = founder._id;
    await newGroup.save();
    await founder.save({ validateBeforeSave: false });
    res.status(201).json({
      status: "success",
      data: {
        group: newGroup,
      },
    });
  }
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
