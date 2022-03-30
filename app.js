// Import Express
const express = require("express");

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

module.exports = { app };
