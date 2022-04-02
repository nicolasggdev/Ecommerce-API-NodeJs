// Import Model
const { User } = require("../model/user.model");
const { Product } = require("../model/product.model");
const { Order } = require("../model/order.model");
const { Cart } = require("../model/cart.model");

// Import Bcrypt
const bcrypt = require("bcryptjs");

// Import JWT
const jwt = require("jsonwebtoken");

// Import dotenv
const dotenv = require("dotenv");

// Import Utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");
const { filterObj } = require("../utils/filterObj");

// Init dotenv
dotenv.config({ path: "./config.env" });

// Define the controllers

// Create a new user

exports.createUser = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  const salt = await bcrypt.genSalt(12);

  const passwordCrypt = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username,
    email,
    password: passwordCrypt
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

// Get all users

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
    where: { status: "active" }
  });

  res.status(200).json({
    status: "success",
    data: {
      users
    }
  });
});

// END Get all users

// Get user by id

exports.getUserById = catchAsync(async (req, res, next) => {
  const { user } = req;

  res.status(200).json({
    status: "success",
    data: {
      user
    }
  });
});

// END Get user by id

// Get the products than user created
exports.productsCreated = catchAsync(async (req, res, next) => {
  const { id } = req.currentUser;

  const productsCreated = await Product.findAll({ where: { userId: id } });

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
  const { user } = req;

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

// Delete the user
exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: "deleted" });

  res.status(204).json({
    status: "success"
  });
});

// END Delete the user

// Get all the user orders
exports.getAllOrders = catchAsync(async (req, res, next) => {
  const { currentUser } = req;

  const orders = await Order.findAll({ where: { userId: currentUser.id } });

  res.status(200).json({
    status: "success",
    data: {
      orders
    }
  });
});

// END Get all the user orders

// Get user orders by id
exports.getOrderById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({
    where: { id },
    include: [
      {
        model: Cart,
        include: [
          { model: Product, through: { where: { status: "purchased" } } }
        ]
      }
    ]
  });

  if (!order) {
    return next(new AppError(404, "No order found with that id"));
  }

  res.status(200).json({
    status: "success",
    data: { order }
  });
});

// END Get user orders by id
