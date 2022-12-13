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
    type: Number,
  },
  endDate: {
    type: Number,
  },
  group: {
    type: mongoose.Schema.ObjectId,
    ref: 'Group'
  },
  class: {
    type: mongoose.Schema.ObjectId,
    ref: 'Class'
  }
});

const CalendarEvent = mongoose.model('CalendarEvent', calendarEventSchema);

module.exports = CalendarEvent;
