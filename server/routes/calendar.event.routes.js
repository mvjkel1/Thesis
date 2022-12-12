const express = require('express');
const router = express.Router({ mergeParams: true });
const calendarController = require('./../controllers/calendar.event.controller');
const authController = require('./../controllers/auth.controller');

router
  .route('/')
  .post(authController.protect, calendarController.createEvent)
  .get(authController.protect, calendarController.getAllEvents);

router
  .route('/:id')
  .get(authController.protect, calendarController.getEvent)
  .patch(authController.protect, calendarController.updateEvent)
  .delete(authController.protect, calendarController.deleteEvent);

module.exports = router;
