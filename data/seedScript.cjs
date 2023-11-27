// seed.cjs

const mongoose = require("mongoose");
const Product = require("../models/Product");
const products = require("./product.cjs"); // Assuming you have a separate file with product data
const User = require("../models/User");
const users = require("./user.cjs");
const constant = require("../constant");

const connectDB = async () => {
  try {
    await mongoose.connect(constant.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    await seedProducts();
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

const seedProducts = async () => {
  try {
    console.log("Dropping existing products collection...");
    await Product.deleteMany(); // Drop the existing collection
    await User.deleteMany();
    console.log("Inserting new products...");

    // Insert products in batches
    for (let i = 0; i < products.length; i++) {
      const product = new Product(products[i]);
      await product.save(); // Increase timeout to 30 seconds
      console.log(`Product Inserted  ${products}`);
    }
    console.log(`Product Inserted `);

    for (let i = 0; i < users.length; i++) {
      const user = new User(users[i]);
      await user.save(); // Increase timeout to 30 seconds
    }
    console.log(`User Inserted  `);

    console.log("Seeding complete!");
  } catch (error) {
    console.error("Error seeding products:", error.message);
  }
};
connectDB();
