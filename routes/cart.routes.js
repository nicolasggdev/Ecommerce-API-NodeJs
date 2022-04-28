const express = require("express");

const {
  addProductToCart,
  getUserCart,
  updateCartProduct,
  removeProductFromCart,
  purchaseCart
} = require("../controllers/cart.controllers");

const { validateSession } = require("../middlewares/auth.middleware");
const {
  addProductToCartValidation,
  validationResult
} = require("../middlewares/validators.middleware");

const router = express.Router();

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
