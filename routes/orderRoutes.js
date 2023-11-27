const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authService = require("../services/authService");

router.get(
  "/my-orders",
  authService.isusersignin,
  authService.isAuthenticated,
  orderController.getMyOrders
);
router.post(
  "/add-order",
  authService.isusersignin,
  authService.isAuthenticated,
  orderController.addOrder
);
router.post(
  "/delete-order/:id",
  authService.isusersignin,
  authService.isAuthenticated,
  orderController.deleteOrder
);

module.exports = router;
