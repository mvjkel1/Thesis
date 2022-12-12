const catchAsync = require('./../utils/catch.async');
const AppError = require('./../utils/app.error');
const { StatusCodes } = require('http-status-codes');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', StatusCodes.NOT_FOUND));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', StatusCodes.NOT_FOUND));
    }

    res.status(200).json({
      status: 'success',
      data: doc
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: doc
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    const doc = await query;
    if (!doc) {
      return next(new AppError('No document found with that ID', StatusCodes.NOT_FOUND));
    }

    res.status(200).json({
      status: 'success',
      data: doc
    });
  });

exports.getAll = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    // To allow for neseted GET classes pn group
    let filter = {};
    if (req.params.groupId) {
      filter = { groupId: req.params.groupId };
    }

    let query = Model.find(filter);
    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    const doc = await query;
    if (!doc) {
      return next(new AppError('No document found with that ID', StatusCodes.NOT_FOUND));
    }

    res.status(201).json({
      status: 'success',
      results: doc.length,
      data: doc
    });
  });
