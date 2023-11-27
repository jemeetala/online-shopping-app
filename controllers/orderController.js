const orderService = require('../services/orderService');

exports.getMyOrders = orderService.getMyOrders;
exports.addOrder = orderService.addOrder;
exports.deleteOrder = orderService.deleteOrder;
