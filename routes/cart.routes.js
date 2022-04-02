// Import Express
const express = require("express");

// Controller
const {
  addProductToCart,
  getUserCart,
  updateCartProduct,
  removeProductFromCart,
  purchaseCart
} = require("../controllers/cart.controllers");

// Import Middleware
const { validateSession } = require("../middlewares/auth.middleware");
const {
  addProductToCartValidation,
  validationResult
} = require("../middlewares/validators.middleware");

// Init Router
const router = express.Router();

// Define the endpoints

router.use(validateSession);

router.get("/", getUserCart);

router.post(
  "/add-product",
  addProductToCartValidation,
  validationResult,
  addProductToCart
);

router.patch("/update-product", updateCartProduct);

router.delete("/:productId", removeProductFromCart);

router.post("/purchase", purchaseCart);

module.exports = { cartRouter: router };
