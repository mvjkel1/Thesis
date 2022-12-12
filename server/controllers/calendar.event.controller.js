const User = require('./../models/user.model');
const Group = require('./../models/group.model');
const CalendarEvent = require('./../models/calendar.event.model');
const catchAsync = require('./../utils/catch.async.js');
const factory = require('./handler.factory');

exports.createEvent = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user.group) {
    return next(new AppError('You have to be member of a group.', StatusCodes.UNAUTHORIZED));
  }
  const newEvent = await CalendarEvent.create({
    title: req.body.title,
    createdBy: user.id,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    group: user.group
  });
  res.status(201).json({
    status: 'success',
    event: newEvent
  });
});

exports.updateEvent = factory.updateOne(CalendarEvent);
exports.getEvent = factory.getOne(CalendarEvent, { path: 'group createdBy' });
exports.getAllEvents = factory.getAll(CalendarEvent, { path: 'group createdBy' });
exports.deleteEvent = factory.deleteOne(CalendarEvent);
