// Models
const { Product } = require("../../model/product.model");

// Utils
const { AppError } = require("../../utils/appError");
const { catchAsync } = require("../../utils/catchAsync");

exports.productExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { productId } = req.body;

  const product = await Product.findOne({
    where: { status: "active", id }
  });

  if (!product) {
    return next(new AppError(404, "No product found"));
  }

  req.product = product;

  next();
});

exports.productOwner = catchAsync(async (req, res, next) => {
  const { currentUser, product } = req;

  if (product.userId !== currentUser.id) {
    return next(new AppError(403, "You are not the owner of this product"));
  }

  next();
});
