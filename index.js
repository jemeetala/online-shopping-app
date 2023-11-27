// // index.js

// const express = require("express");
// const connectDB = require("./config/db");
// const passport = require("passport");
// const passportJWT = require("passport-jwt");
// const LocalStrategy = require("passport-local").Strategy;
// const session = require("express-session");

// const bodyParser = require("body-parser");

// const cors = require("cors");
// const User = require("./models/User");
// const authRoutes = require("./routes/authRoutes");
// const productRoutes = require("./routes/productRoutes");
// const flash = require("connect-flash");

// const compression = require("compression");
// const bcrypt = require("bcrypt");
// const path = require("path"); // Add this line

// const app = express();

// // Connect to MongoDB
// connectDB();
// // Middleware

// app.use(compression());
// app.use(express.json());
// app.use(
//   cors({
//     methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
//     origin: "*",
//   })
// );

// app.use(passport.initialize());
// app.use(
//   session({
//     secret: "your-secret-key",
//     resave: true,
//     saveUninitialized: true,
//   })
// );
// app.use(flash());
// app.use((req, res, next) => {
//   res.locals.error = req.flash("error");
//   next();
// });
// app.use(passport.session());

// // Passport JWT configuration
// passport.use(
//   new LocalStrategy(async (username, password, done) => {
//     try {
//       const user = await User.findOne({ username: username });
//       if (!user) return done(null, false, { message: "Incorrect username." });

//       const isPasswordValid = await bcrypt.compare(password, user.password);
//       if (!isPasswordValid) {
//         return done(null, false, { message: "Incorrect password." });
//       }

//       return done(null, user);
//     } catch (error) {
//       return done(error);
//     }
//   })
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (error) {
//     done(error, null);
//   }
// });
// // // Middleware
// app.use(express.static(path.join(__dirname, "public")));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.set("view engine", "ejs");
// app.get("/dashboard", (req, res) => {
//   res.render("AddProduct");
// });

// app.use("/auth", authRoutes);
// app.use("/product", productRoutes);

// app.use("/", (req, res) => {
//   res.redirect("/auth/login");
// });

// // Start the server
// app.listen(5000, () => {
//   console.log(`Server running on port ${5000}`);
// })
const express = require("express");
const connectDB = require("./config/db");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./models/User");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");

const flash = require("connect-flash");
const compression = require("compression");
const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser"); // Add this line

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(compression());
app.use(express.json());
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    origin: "*",
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // Add this line

app.use(
  session({
    secret: "your-secret-key",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.error = req.flash("error");
  next();
});
// Passport JWT configuration
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      console.log("User:", user); // Add this line for debugging
      if (!user) return done(null, false, { message: "Incorrect username." });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log("Password Valid:", isPasswordValid); // Add this line for debugging

      if (!isPasswordValid) {
        return done(null, false, { message: "Incorrect password." });
      }
      const token = jwt.sign({ id: user._id }, "your-secret-key", {
        expiresIn: "1h",
      });

      return done(null, { user, token });
    } catch (error) {
      console.error("Error during authentication:", error);
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

app.use(passport.initialize());
app.use(passport.session());

// View Engine Setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);
app.use("/wishlist", wishlistRoutes);

// app.use("/", (req, res) => {
//   res.redirect("/auth/login");
// });

// Start the server
app.listen(5000, () => {
  console.log(`Server running on port ${5000}`);
});
