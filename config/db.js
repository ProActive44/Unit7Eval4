const mongoose = require("mongoose");

require("dotenv").config();

const connection = mongoose
  .connect(process.env.MONGO_URL)
  .then((res) => console.log("Database connected.."))
  .catch((err) => console.log("Failed to connect database", err));

module.exports = connection;
