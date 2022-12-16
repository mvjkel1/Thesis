const Group = require('./../models/group.model');
const User = require('./../models/user.model');
const Class = require('./../models/class.model');
const catchAsync = require('./../utils/catch.async');
const factory = require('./handler.factory');
const AppError = require('./../utils/app.error');
const crypto = require('crypto');
const sendEmail = require('./../utils/email');
const { StatusCodes } = require('http-status-codes');
const { ObjectId } = require('mongoose').Types;

exports.createGroup = catchAsync(async (req, res, next) => {
  if (!req.body.founder) req.body.founder = req.user.id;
  const founder = await User.findById(req.body.founder);
  const newGroup = await Group.create(req.body);
  if (founder.group)
    return next(new AppError('You already belong to a group.', StatusCodes.UNAUTHORIZED));
  if (founder.role != 'admin') founder.role = 'group-representative';
  founder.group = newGroup._id;
  founder.save({ validateBeforeSave: false });
  newGroup.members.push(founder);
  newGroup.save({ validateBeforeSave: false });
  res.status(201).json({
    status: 'success',
    data: {
      group: newGroup
    }
  });
});

exports.inviteToGroup = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const group = await Group.findById(req.params.id);
  const groupToken = group.createInviteToken();
  await group.save({ validateBeforeSave: false });
  const groupURL = `${req.protocol}://${req.get('host')}/api/v1/groups/${groupToken}}`;

  const message = `${user.name} zaprasza do grupy ${group.name} - ${groupURL}`;

  try {
    await sendEmail({
      email: req.body.email,
      message
    });
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email.',
      initiatedBy: user.name,
      groupName: group.name
    });
  } catch (err) {
    group.inviteToken = undefined;
    await group.save({ validateBeforeSave: false });
    return next(
      new AppError('There was an error while sending the email.', StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
});

exports.joinGroup = catchAsync(async (req, res, next) => {
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const group = await Group.findOne({
    inviteToken: hashedToken
  });
  if (!group) return next(new AppError('Group not found.', StatusCodes.NOT_FOUND));
  const user = await User.findById(req.user.id);
  // if (user.group !== null) {
  //   return next(new AppError('You already belong to a group.', StatusCodes.UNAUTHORIZED));
  //   if (user.group._id.toString() === group._id.toString())
  //     return next(new AppError('You already belong to this group.', StatusCodes.UNAUTHORIZED));
  // }
  user.group = group._id.toString();
  await user.save({ validateBeforeSave: false });
  group.members.push({ user });
  await group.save({ validateBeforeSave: false });
  // group.inviteToken = undefined;
  res.status(201).json({
    status: 'success',
    data: {
      group,
      user,
      inivitedBy: group.founder
    }
  });
});

exports.discardGroupFounder = catchAsync(async (req, res, next) => {
  const founder = await User.findById(req.user.id);
  if (founder.role !== 'admin') {
    founder.role = 'user';
  }
  founder.save({ validateBeforeSave: false });
  next();
});

exports.getMyGroup = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  let group = '';
  if (user.group !== null) {
    const groupId = user.group;
    group = await Group.find({ _id: { $in: groupId } });
    console.log(group);
  } else {
    group = user.group;
  }
  res.status(200).json({
    title: 'My group',
    group
  });
});

exports.deleteGroup = catchAsync(async (req, res, next) => {
  const group = await Group.findByIdAndDelete(req.params.id);

  const user = await User.findById(req.user.id);
  user.group = undefined;
  user.save({ validateBeforeSave: false });

  if (!group) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// I may consider implementing it using pre hooks later ;).
exports.removeAllClassesBasedOnGroup = catchAsync(async (req, res, next) => {
  // Find all classes based on the group
  await Class.deleteMany({ group: req.params.id });
  next();
});

exports.leaveGroup = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const group = await Group.findById(user.group._id);
  if (!group) {
    return next(new AppError('No document found with that ID', StatusCodes.NOT_FOUND));
  }

  if (user.role !== 'user') {
    return next(
      new AppError(
        'If you are a founder you have to delete a group, to leave it.',
        StatusCodes.UNAUTHORIZED
      )
    );
  }

  user.group = undefined;
  user.save({ validateBeforeSave: false });
  console.log(group.members);
  await Group.updateOne({ _id: req.params.id }, { $pull: { members: ObjectId(req.user.id) } });

  console.log(group.members);
  res.status(201).json({
    status: 'success',
    data: `Successfully left the ${group.name} group.`
  });
});

exports.updateGroup = factory.updateOne(Group);
exports.getGroup = factory.getOne(Group, { path: 'classes' });
exports.getAllGroups = factory.getAll(Group, { path: 'classes' });
