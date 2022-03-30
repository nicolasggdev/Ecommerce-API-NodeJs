// Import Express
const express = require("express");

// Init Router
const router = express.Router();

// Define the endpoints

router.post("/add-product", () => {});

router.patch("/update-cart", () => {});

router.delete("/:productId", () => {});

router.post("/purchase", () => {});

module.exports = { cartRouter: router };
