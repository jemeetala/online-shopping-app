const Product = require("../models/Product");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.getAllProducts = async () => {
  return await Product.find();
};
exports.addProduct = async (req, res) => {
  const { title, description, price, material, size, weight } = req.body;

  try {
    const images = req?.files?.map((file) => file.buffer.toString("base64"));
    const product = new Product({
      title,
      description,
      price,
      images,
      material,
      size,
      weight,
    });
    await product.save();
    res.redirect("/product/dashboard");
  } catch (error) {
    console.error(error);
    req.flash("error", "Insertion Failed, try again");
    res.redirect("/product/add-product");
  }
};
exports.getProductDetails = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.render("ProductDetail", { product, user: req?.user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    await Product.findByIdAndDelete(productId);
    res.redirect("/product/dashboard");
  } catch (error) {
    console.error(error);
    res.redirect("/product/dashboard");
  }
};
