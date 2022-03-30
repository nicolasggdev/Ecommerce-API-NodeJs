// Import Database
const { database } = require("../database/database");

// Import Datatypes
const { DataTypes } = require("sequelize");

// Create the model
const Cart = database.define("cart", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(10),
    allowNull: false,
    defaultValue: "active"
  }
});

module.exports = { Cart };
