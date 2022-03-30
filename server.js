// Import App
const { app } = require("./app");

// Import Database
const { database } = require("./database/database");

// Import Relation Models
const { initModels } = require("./database/initModels");

// Import dotenv
const dotenv = require("dotenv");

// Init dotenv
dotenv.config({ path: "./config.env" });

// Database Authenticated
database
  .authenticate()
  .then(() => console.log("Database is authenticated"))
  .catch((err) => console.log(err));

// Init Relations Models
initModels();

// Databse Synced
database
  .sync()
  .then(() => console.log("Database is synced"))
  .catch((err) => console.log(err));

// Create a server on http://localhost:4000
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});
