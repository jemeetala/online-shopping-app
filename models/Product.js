const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }], // Assuming images are stored as file paths
  material: { type: String, required: true },
  size: { type: String, required: true },
  weight: { type: String, required: true },
  
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
