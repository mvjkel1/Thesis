const express = require('express');
const groupController = require('../controllers/group.controller');
const authController = require('../controllers/auth.controller');
const classRouter = require('./../routes/class.routes');
const calendarEventRouter = require('./../routes/calendar.event.routes');
const router = express.Router();

router.use('/:groupId/classes', classRouter);
router.use('/:groupId/events', calendarEventRouter);

router
  .route('/')
  .get(groupController.getAllGroups)
  .post(authController.protect, groupController.createGroup);

router.route('/my-group').get(authController.protect, groupController.getMyGroup);

router
  .route('/:id')
  .get(authController.protect, groupController.getGroup)
  .delete(
    authController.protect,
    authController.restrictTo('group-representative', 'admin'),
    groupController.removeAllClassesBasedOnGroup,
    groupController.discardGroupFounder,
    groupController.deleteGroup
  )
  .patch(
    authController.protect,
    authController.restrictTo('group-representative', 'admin'),
    groupController.updateGroup
  );

router.route('/:token').post(authController.protect, groupController.joinGroup);

router.route('/invite/:id').post(authController.protect, groupController.inviteToGroup);

module.exports = router;
