const authService = require("../services/authService");
const User = require("../models/User");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
exports.getLogin = (req, res) => {
  res.render("login");
};

exports.postLogin = authService.login;

exports.getSignup = (req, res) => {
  res.render("signup");
};

exports.postSignup = authService.signup;

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Error during logout:", err);
      return res.redirect("/"); // Redirect to home or another page on error
    }
    res.clearCookie("jwt"); // Clear the JWT cookie
    res.redirect("/product/dashboard");
  });
};

//profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req?.user?._id);

    res.render("profile", { user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { username, email, firstname, lastname, mobile } = req.body;
    const images = req?.files?.map((file) => file.buffer.toString("base64"));

    // Update user information
    await User.findByIdAndUpdate(req.user._id, {
      username,
      email,
      firstname,
      lastname,
      mobile,
      images,
    });
    req.flash("error", "PROFILE UPDATED SUCCESSFULLY");
    res.redirect("/auth/profile");
  } catch (error) {
    console.error(error);
    res.redirect("/product/dashboard");
  }
};
