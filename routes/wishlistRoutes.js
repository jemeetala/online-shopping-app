const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const authService = require("../services/authService");

// Add product to wishlist
router.post(
  "/add",
  authService.isusersignin,
  authService.isAuthenticated,
  wishlistController.addToWishlist
);

// Display wishlist
router.get(
  "/getwishlist",
  authService.isusersignin,
  authService.isAuthenticated,
  wishlistController.getWishlist
);

router.post(
  "/delete-wishlist/:id",
  authService.isusersignin,
  authService.isAuthenticated,
  wishlistController.deleteWishlist
);

module.exports = router;
