// Import Sequelize
const { Sequelize } = require("sequelize");

// Import dotenv
const dotenv = require("dotenv");

// Init dotenv
dotenv.config({ path: "./config.env" });

const database = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: "" + process.env.DB_PASSWORD,
  database: process.env.DB,
  port: 5432,
  dialect: "postgres",
  logging: false
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false
  //   }
  // }
});

module.exports = { database };
