// Import Express
const express = require("express");

// Import Middleware
const { validateSession } = require("../middlewares/auth.middleware");

// Init Router
const router = express.Router();

// Define the endpoints

router.use(validateSession);

router.post("/add-product", () => {});

router.patch("/update-cart", () => {});

router.delete("/:productId", () => {});

router.post("/purchase", () => {});

module.exports = { cartRouter: router };
