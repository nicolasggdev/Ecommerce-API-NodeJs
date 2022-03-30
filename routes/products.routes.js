// Import Express
const express = require("express");

// Init Router
const router = express.Router();

// Define the endpoints

router
  .route("/")
  .post(() => {})
  .get(() => {});

router
  .route("/:id")
  .get(() => {})
  .patch(() => {})
  .delete(() => {});

module.exports = { productsRouter: router };
