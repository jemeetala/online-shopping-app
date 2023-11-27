const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authService = require("../services/authService");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get("/logout", authController.logout);

///for profile

router.get(
  "/profile",
  authService.isusersignin,
  authService.isAuthenticated,
  authController.getProfile
);

// Update profile
router.post(
  "/profile/update",
  authService.isusersignin,
  authService.isAuthenticated,
  upload.array("images", 1),
  authController.updateProfile
);
module.exports = router;
