var mongoose = require('mongoose');
const User = require('./../models/user.model');
const Group = require('./../models/group.model');
const Class = require('./../models/class.model');
const CalendarEvent = require('./../models/calendar.event.model');
const catchAsync = require('./../utils/catch.async.js');
const factory = require('./handler.factory');
const AppError = require('./../utils/app.error');
const { StatusCodes } = require('http-status-codes');

exports.createEvent = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const class_ = await Class.findById(mongoose.Types.ObjectId(req.body.classId));
  if (!user.group) {
    return next(new AppError('You have to be member of a group.', StatusCodes.UNAUTHORIZED));
  }
  if (!class_) {
    return next(new AppError('Class does not exist..', StatusCodes.UNAUTHORIZED));
  }
  const dateobj = new Date(req.body.startDate);

  const newEvent = await CalendarEvent.create({
    title: req.body.title,
    createdBy: user.id,
    startDate: parseInt(req.body.startDate),
    endDate: parseInt(req.body.endDate),
    description: req.body.description,
    group: user.group,
    class: class_.id
  });
  res.status(201).json({
    status: 'success',
    event: newEvent
  });
});

exports.updateEvent = factory.updateOne(CalendarEvent);
exports.getEvent = factory.getOne(CalendarEvent, { path: 'group createdBy' });
exports.getAllEvents = factory.getAll(CalendarEvent, { path: 'group createdBy class' });
exports.deleteEvent = factory.deleteOne(CalendarEvent);
