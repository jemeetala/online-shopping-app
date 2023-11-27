const Order = require("../models/Order");

exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have set up the authentication middleware
    const orders = await Order.find({ user_id: userId }).populate("product_id");
    res.render("MyOrder", { orders, user: req?.user });
  } catch (error) {
    console.error(error);
    res.render("MyOrder", { orders: [] });
  }
};

exports.addOrder = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id; // Assuming you have set up the authentication middleware

  try {
    const order = new Order({
      product_id: productId,
      user_id: userId,
      createdAt: Date.now(),
    });
    await order.save();
    res.redirect("/order/my-orders");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.deleteOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
    await Order.findByIdAndDelete(orderId);
    res.redirect("/order/my-orders", { user: req?.user });
  } catch (error) {
    console.error(error);
    res.redirect("/order/my-orders");
  }
};
