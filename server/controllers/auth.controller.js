const { promisify } = require('util');
const User = require('./../models/user.model');
const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catch.async');
const AppError = require('./../utils/app.error');
const sendEmail = require('./../utils/email');
const crypto = require('crypto');
const { StatusCodes } = require('http-status-codes');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secue = true;
  }

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  try {
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        user
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    group: req.body.group
  });
  try {
    await sendEmail({
      email: req.body.email,
      subject: 'Witam',
      message: 'Witam'
    });
  } catch (err) {
    return next(
      new AppError('Something went wrong while sending an email.', StatusCodes.UNAUTHORIZED)
    );
  }
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', StatusCodes.BAD_REQUEST));
  } else {
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPasswords(password, user.password))) {
      return next(new AppError('Incorrect email or password!', StatusCodes.UNAUTHORIZED));
    }
    createSendToken(user, 200, res);
  }
});

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
  next();
});

//.Protect getAllClasses route
exports.protect = catchAsync(async (req, res, next) => {
  // 1. Getting token and check if it exists
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in - not authorized to get there.', StatusCodes.UNAUTHORIZED)
    );
  }

  // 2. Verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3. Check if user still exists
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new AppError('The user belonging to this token does no longer exist.', 401));
  }

  // 4. Check if user changed password after the token was issued
  if (user.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', StatusCodes.UNAUTHORIZED)
    );
  }

  // Pass user to another middleware
  req.user = user;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'class-representative']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', StatusCodes.FORBIDDEN)
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError(`There is no user with that: ${user.email} email address`, 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}}`;

  const message = `Boguś zapomniał hasła? Niesamowite - ${resetURL}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Reset password token - valid for 10 minutes',
      message
    });
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email.'
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError('There was an error while sending the email.', StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // Get user based on token
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  // If token has no expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired.'), StatusCodes.BAD_REQUEST);
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  // Update changedPasswordAt property for the user
  // Log the user in, send JWT
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // Get the user from database
  const user = await User.findById(req.user.id).select('+password');
  // Check if POSTed password is valid
  if (!(await user.correctPasswords(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', StatusCodes.UNAUTHORIZED));
  }
  // Update the password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // Log the user in, send JWT
  createSendToken(user, 200, res);
});
