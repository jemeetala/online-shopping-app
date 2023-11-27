const productService = require("../services/productService");

exports.getProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.render("dashboard", { products, user: req?.user });
  } catch (error) {
    console.error(error);
    res.render("dashboard", { products: [] }); // Handle the error gracefully
  }
};
exports.getAddProduct = (req, res) => {
  res.render("AddProduct", { user: req?.user });
};
exports.getSignup = (req, res) => {
  res.render("signup");
};

exports.getProductDetails = productService.getProductDetails;

exports.postAddProduct = productService.addProduct;
exports.deleteProduct = productService.deleteProduct;
