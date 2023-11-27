const mongoose = require("mongoose");
const constant = require("../constant");
const connectDB = async () => {
  try {
    await mongoose.connect(constant.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

module.exports = connectDB;
