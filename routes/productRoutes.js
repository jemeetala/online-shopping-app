const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const multer = require("multer");
const authService = require("../services/authService");
const passport = require("passport");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.get(
  "/dashboard",
  authService.isusersignin,
  productController.getProducts
);
router.get(
  "/add-product",
  authService.isAuthenticated,
  authService.isAdmin,
  productController.getAddProduct
);
router.post(
  "/add-product",
  authService.isusersignin,
  authService.isAuthenticated,
  authService.isAdmin,
  upload.array("images", 5),
  productController.postAddProduct
);
router.get(
  "/product-detail/:id",
  authService.isusersignin,
  productController.getProductDetails
);

router.post(
  "/delete-product/:id",
  authService.isusersignin,
  authService.isAuthenticated,
  authService.isAdmin,
  productController.deleteProduct
);

module.exports = router;
