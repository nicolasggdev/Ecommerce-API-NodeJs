// Import Model
const { User } = require("../model/user.model");

// Import Bcrypt
const bcrypt = require("bcryptjs");

// Import JWT
const jwt = require("jsonwebtoken");

// Import Utils
const { catchAsync } = require("../utils/catchAsync");

// Define the controllers

// Create a new user

exports.createUser = catchAsync(async (req, res, next) => {
  const { username, email, password, address } = req.body;

  const salt = await bcrypt.genSalt(12);

  const passwordCrypt = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username,
    email,
    password: passwordCrypt,
    address
  });

  newUser.password = undefined;

  res.status(201).json({
    status: "success",
    data: {
      newUser
    }
  });
});

// END Create a new user

// Login the user

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email, status: "active" } });

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!user || !isPasswordValid) {
    return next(new AppError(400, "Credentials are invalid"));
  }

  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.status(200).json({
    status: "success",
    data: {
      token
    }
  });
});

// END Login the user
