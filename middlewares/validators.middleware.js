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
    .withMessage("Must provide a valid password"),
  body("address")
    .isString()
    .withMessage("Address must be a String")
    .notEmpty()
    .withMessage("Must provide a valid address")
];

// END Users Validators

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
