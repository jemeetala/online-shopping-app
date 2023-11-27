const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  images: [{ type: String }],
  mobile: String,
  firstname: String,
  lastname: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
