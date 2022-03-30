// Import Express
const express = require("express");

// Import Controllers
const { createUser, loginUser } = require("../controllers/users.controllers");

// Import Middleware
const { validateSession } = require("../middlewares/auth.middleware");

// Init Router
const router = express.Router();

// Define the endpoints

router.post("/", createUser);

router.post("/login", loginUser);

router.use(validateSession);

router.get("/me", () => {});

router
  .route("/:id")
  .patch(() => {})
  .delete(() => {});

router.get("/orders");

router.get("/orders/:id");

module.exports = { userRouter: router };
