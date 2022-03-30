// Import Express
const express = require("express");

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
