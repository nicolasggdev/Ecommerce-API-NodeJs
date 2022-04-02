// Import Express
const express = require("express");

// Import Controllers
const {
  createUser,
  loginUser,
  productsCreated,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
  getAllOrders,
  getOrderById
} = require("../controllers/users.controllers");

// Import Middleware
const { validateSession } = require("../middlewares/auth.middleware");
const {
  protectAccountOwner,
  userExist
} = require("../middlewares/users/users.middleware");
const {
  createUserValidator,
  validationResult
} = require("../middlewares/validators.middleware");

// Init Router
const router = express.Router();

// Define the endpoints

router.post("/", createUserValidator, validationResult, createUser);

router.post("/login", loginUser);

router.use(validateSession);

router.get("/me", productsCreated);

router.get("/", getAllUsers);

router.get("/orders", getAllOrders);

router.get("/orders/:id", getOrderById);

router
  .use("/:id", userExist)
  .route("/:id")
  .get(getUserById)
  .patch(protectAccountOwner, updateUser)
  .delete(protectAccountOwner, deleteUser);

module.exports = { userRouter: router };
