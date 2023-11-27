const Wishlist = require("../models/Wishlist");

exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;
  const user_Id = req.user._id; // Assuming you have user information in req.user
  const product_Id = productId;
  try {
    // Check if the product is already in the wishlist
    const existingProduct = await Wishlist.findOne({ user_Id, product_Id });

    if (!existingProduct) {
      // If not, add the product to the wishlist
      const wishlistItem = new Wishlist({ user_Id, product_Id });
      await wishlistItem.save();
    }

    res.redirect("/product/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getWishlist = async (req, res) => {
  const userId = req.user._id; // Assuming you have user information in req.user

  try {
    // Fetch wishlist items for the user
    const wishlistItems = await Wishlist.find({ user_Id: userId }).populate(
      "product_Id"
    );

    // Render the wishlist page with wishlistItems
    res.render("WishList", { wishlistItems, user: req?.user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.deleteWishlist = async (req, res) => {
  const wishlistId = req.params.id;

  try {
    await Wishlist.findByIdAndDelete(wishlistId);
    res.redirect("/wishlist/getwishlist", { user: req?.user });
  } catch (error) {
    console.error(error);
    res.redirect("/wishlist/getwishlist");
  }
};
