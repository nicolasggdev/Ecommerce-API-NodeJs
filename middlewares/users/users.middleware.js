const { User } = require("../../model/user.model");

const { AppError } = require("../../utils/appError");
const { catchAsync } = require("../../utils/catchAsync");

exports.userExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id, status: "active" },
    attributes: { exclude: ["password"] }
  });

  if (!user) {
    return next(new AppError(404, "Cant find the user with the given ID"));
  }

  req.user = user;

  next();
});

exports.protectAccountOwner = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { currentUser } = req;

  if (currentUser.id !== +id) {
    return next(new AppError(403, "You cant update others users accounts"));
  }

  next();
});
