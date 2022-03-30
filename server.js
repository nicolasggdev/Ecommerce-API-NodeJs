// Import App
const { app } = require("./app");

// Import Database
const { database } = require("./database/database");

// Import dotenv
const dotenv = require("dotenv");

// Init dotenv
dotenv.config({ path: "./config.env" });

// Database Authenticated
database
  .authenticate()
  .then(() => console.log("Database is authenticated"))
  .catch((err) => console.log(err));

// Create a server on http://localhost:4000
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});
