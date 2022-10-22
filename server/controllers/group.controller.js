const Group = require("./../models/group.model");

exports.createGroup = async (req, res, next) => {
  const newGroup = await Group.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      group: newGroup,
    },
  });
};
