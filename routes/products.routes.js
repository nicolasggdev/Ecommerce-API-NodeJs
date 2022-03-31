// Import Express
const express = require("express");

// Import Controllers
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/products.controllers");

// Import Middleware
const { validateSession } = require("../middlewares/auth.middleware");
const {
  productExists,
  productOwner
} = require("../middlewares/products/products.middleware");

const {
  createProductValidator,
  validationResult
} = require("../middlewares/validators.middleware");

// Import Utils
const { upload } = require("../utils/multer");

// Init Router
const router = express.Router();

// Define the endpoints

router.use(validateSession);

router
  .route("/")
  .post(
    upload.single("productImg"),
    createProductValidator,
    validationResult,
    createProduct
  )
  .get(getAllProducts);

router
  .use("/:id", productExists)
  .route("/:id")
  .get(getProductById)
  .patch(productOwner, updateProduct)
  .delete(productOwner, deleteProduct);

module.exports = { productsRouter: router };
