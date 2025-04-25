const mongoose = require("mongoose");

// dotenv
require("dotenv").config();
// connect to db
exports.connect = mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("DB connection is Done");
  })
  .catch((err) => {
    console.log("Error in DB connection:", err);
    process.exit(1);
  });
