// Import Express
const express = require("express");

// Import Controllers
const {
  createUser,
  loginUser,
  productsCreated,
  updateUser
} = require("../controllers/users.controllers");

// Import Middleware
const { validateSession } = require("../middlewares/auth.middleware");

// Init Router
const router = express.Router();

// Define the endpoints

router.post("/", createUser);

router.post("/login", loginUser);

router.use(validateSession);

router.get("/me", productsCreated);

router
  .route("/:id")
  .patch(updateUser)
  .delete(() => {});

router.get("/orders");

router.get("/orders/:id");

module.exports = { userRouter: router };
