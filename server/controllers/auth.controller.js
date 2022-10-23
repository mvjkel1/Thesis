const { promisify } = require("util");
const User = require("./../models/user.model");
const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catch.async");
const AppError = require("./../utils/app.error");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  try {
    res.status(statusCode).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  } else {
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPasswords(password, user.password))) {
      return next(new AppError("Incorrect email or password!", 401));
    }
    createSendToken(user, 200, res);
  }
});

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
  next();
});

//.Protect getAllClasses route
exports.protect = catchAsync(async (req, res, next) => {
  // 1. Getting token and check if it exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in - not authorized to get there.", 401)
    );
  }
  console.log(token);

  // 2. Verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3. Check if user still exists
  const user = User.findById(decoded.id);
  if (!user) {
    return next(
      new Error("You are not logged in - not authorized to get there.", 401)
    );
  }
  // 4. Check if user changed password after the token was issued

  next();
});

exports.resetPassword = async (req, res, next) => {};
