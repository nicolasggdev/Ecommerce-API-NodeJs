// Import Express-Validator
const { body, validationResult } = require("express-validator");

// Import Utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

// Users Validators
exports.createUserValidator = [
  body("username")
    .isString()
    .withMessage("Username must be a String")
    .notEmpty()
    .withMessage("Must provide a valid username"),
  body("email")
    .isEmail()
    .withMessage("The format is not valid, try with a email")
    .notEmpty()
    .withMessage("Must provide a valid email"),
  body("password")
    .isString()
    .withMessage("Password must be a String")
    .notEmpty()
    .withMessage("Must provide a valid password")
];

// END Users Validators

// Products Validators
exports.createProductValidator = [
  body("title")
    .isString()
    .withMessage("Title must be a String")
    .notEmpty()
    .withMessage("Must provide a valid title"),
  body("description")
    .isString()
    .withMessage("Description must be a String")
    .notEmpty()
    .withMessage("Must provide a valid description"),
  body("quantity")
    .isNumeric()
    .withMessage("Quantity must be a Number")
    .custom((value) => value > 0)
    .withMessage("Quantity must be greater than 0")
    .notEmpty()
    .withMessage("Must provide a valid quantity"),
  body("price")
    .isNumeric()
    .withMessage("Price must be a Number")
    .custom((value) => value > 0)
    .withMessage("Price must be greater than 0")
    .notEmpty()
    .withMessage("Must provide a valid price")
];

// END Products Validators

// Cart validations

exports.addProductToCartValidation = [
  body("productId")
    .isNumeric()
    .withMessage("Product id must be a number")
    .custom((value) => value > 0)
    .withMessage("Must provide a valid id"),
  body("quantity")
    .isNumeric()
    .withMessage("Quantity must be a number")
    .custom((value) => value > 0)
    .withMessage("Quantity must be greater than 0")
];

// END Cart validations

exports.validationResult = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMsg = errors
      .array()
      .map((err) => err.msg)
      .join(". ");
    return next(new AppError(400, errorMsg));
  }

  next();
});
