// Import Model
const { User } = require("../model/user.model");
const { Product } = require("../model/product.model");

// Import Bcrypt
const bcrypt = require("bcryptjs");

// Import JWT
const jwt = require("jsonwebtoken");

// Import Utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");
const { filterObj } = require("../utils/filterObj");

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

// Get the products than user created
exports.productsCreated = catchAsync(async (req, res, next) => {
  const { currentUser } = req;

  const productsCreated = await User.findOne({
    where: { id: currentUser.id, status: "active" },
    attributes: { exclude: ["password"] },
    include: [{ model: Product }]
  });

  res.status(200).json({
    status: "success",
    data: {
      productsCreated
    }
  });
});

// END Get the products than user created

// Update the data user
exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id, status: "active" },
    attributes: { exclude: ["password"] }
  });

  if (!user) {
    return next(new AppError(404, "Cant find the user with the given ID"));
  }

  const data = filterObj(req.body, "username", "email");

  const updatedUser = await user.update({ ...data });

  res.status(201).json({
    status: "success",
    data: {
      updatedUser
    }
  });
});

// END Update the data user
