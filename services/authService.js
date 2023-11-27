const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const flash = require("connect-flash");

const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  passport.authenticate("local", { session: false }, async (err, user) => {
    try {
      if (err || !user) {
        req.flash("error", "Invalid Credential or try again.");
        res.redirect("/auth/login");
      }

      const token = jwt.sign(user, "your-secret-key", {
        expiresIn: "1h",
      });

      res.cookie("jwt", token, { httpOnly: true, secure: false });

      // Log the token before redirect

      // Redirect to dashboard after successful login
      return res.redirect("/product/dashboard");
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

exports.signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.redirect("/auth/login");
  } catch (error) {
    console.error(error);
    req.flash(
      "error",
      "Error adding product. Please try again.or your email and username already taken"
    );
    res.redirect("/auth/signup");
  }
};

exports.isAuthenticated = (req, res, next) => {
  // Check if the JWT cookie is present
  const token = req?.cookies?.jwt;

  if (token) {
    jwt.verify(token, "your-secret-key", (err, user) => {
      if (err) {
        console.error("Error verifying JWT:", err);
        return res.redirect("/auth/login");
      }

      req.user = user.user;
      next(); // User is authenticated, continue to the next middleware
    });
  } else {
    res.redirect("/auth/login"); // Redirect to the login page if not authenticated
  }
};

exports.isusersignin = (req, res, next) => {
  // Check if the JWT cookie is present
  const token = req?.cookies?.jwt;

  if (token) {
    jwt.verify(token, "your-secret-key", (err, user) => {
      if (err) {
        console.error("Error verifying JWT:", err);
        return res.redirect("/auth/login");
      }

      req.user = user.user;
      next(); // User is authenticated, continue to the next middleware
    });
  } else {
    next(); // Redirect to the login page if not authenticated
  }
};

exports.isAdmin = (req, res, next) => {
  // Check if the user is authenticated and has the admin role
  if (req.user.isAdmin) {
    return next(); // User is an admin, continue to the next middleware
  } else {
    res.status(403).render("access-denied", {
      message: "Admin privilege required",
      user: req?.user,
    });
  }
};
