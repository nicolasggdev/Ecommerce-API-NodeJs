const multer = require("multer");

const { AppError } = require("../utils/appError");

const storage = multer.memoryStorage();

const multerFileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image")) {
    cb(new AppError(400, "Must provide an image as a file"), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage,
  fileFilter: multerFileFilter
});

module.exports = { upload };
