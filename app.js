// Import Express
const express = require("express");

// Import Helmet
const helmet = require("helmet");

// Import Compression
const compression = require("compression");

// Import Express Rate Limit
const expressRateLimit = require("express-rate-limit");

// Import GlobalError Middleware
const { globalErrorHandler } = require("./middlewares/error.middleware");

// Import Routes
const { userRouter } = require("./routes/users.routes");
const { productsRouter } = require("./routes/products.routes");
const { cartRouter } = require("./routes/cart.routes");

// Init Express
const app = express();

// Enable to receive JSON and Form-Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Init helmet
app.use(helmet());

// Init compression
app.use(compression());

// Init Express Rate Limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message:
    "Too many accounts created from this IP, please try again after an hour"
});

app.use(limiter);

// Init Router
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/cart", cartRouter);

// Middleware for page that not found
app.use("*", (req, res, next) => {
  next(new AppError(404, `${req.originalUrl} not found in this server.`));
});

// Init GlobalError Middleware
app.use(globalErrorHandler);

module.exports = { app };
