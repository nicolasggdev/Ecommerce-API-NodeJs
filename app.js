const express = require("express");

const helmet = require("helmet");

const compression = require("compression");

const rateLimit = require("express-rate-limit");

const { AppError } = require("./utils/appError");

const { globalErrorHandler } = require("./middlewares/error.middleware");

const { userRouter } = require("./routes/users.routes");
const { productsRouter } = require("./routes/products.routes");
const { cartRouter } = require("./routes/cart.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.use(compression());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message:
    "Too many accounts created from this IP, please try again after an hour"
});

app.use(limiter);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/cart", cartRouter);

app.use("*", (req, res, next) => {
  next(new AppError(404, `${req.originalUrl} not found in this server.`));
});

app.use(globalErrorHandler);

module.exports = { app };
