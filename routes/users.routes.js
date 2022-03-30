// Import Express
const express = require("express");

// Init Router
const router = express.Router();

// Define the endpoints

router.post("/", () => {});

router.post("/login", () => {});

router.get("/me", () => {});

router
  .route("/:id")
  .patch(() => {})
  .delete(() => {});

router.get("/orders");

router.get("/orders/:id");

module.exports = { userRouter: router };
