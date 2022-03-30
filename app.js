// Import Express
const express = require("express");

// Init Express
const app = express();

// Enable to receive JSON
app.use(express.json());

// Enable to receive Form-Data
app.use(express.urlencoded({ extended: true }));

module.exports = { app };
