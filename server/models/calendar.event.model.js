const mongoose = require('mongoose');

const calendarEventSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: [true, 'A calendar event must have a name']
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  startDate: {
    type: Date,
    default: Date.now()
  },
  endDate: {
    type: Date,
    default: Date.now()
  },
  group: {
    type: mongoose.Schema.ObjectId,
    ref: 'Group'
  }
});

const CalendarEvent = mongoose.model('CalendarEvent', calendarEventSchema);

module.exports = CalendarEvent;
