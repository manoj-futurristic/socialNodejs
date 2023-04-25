const mongoose = require("mongoose");

const connectDB = (url) => {
  if (!url)
    throw new Error(
      "Please provide db connection string"
    );

  return mongoose.connect(url);
};

module.exports = connectDB;