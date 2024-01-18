const { Wishlist } = require("../model/Wishlist");
const { User } = require("../model/User");

exports.getWishlist = async (req, res) => {
  const { id } = req.user;

  try {
    const wishlist = await Wishlist.findOne({ userId: id }).populate(
      "products"
    );
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.addToWishlist = async (req, res) => {
  const { id } = req.user;
  const { productId } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let wishlist = await Wishlist.findOne({ userId: id });

    if (!wishlist) {
      wishlist = new Wishlist({ userId: id, products: [] });
    }

    wishlist.products.push(productId);
    await wishlist.save();

    res.status(201).json(wishlist);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.removeFromWishlist = async (req, res) => {
  const { id } = req.user;
  const { productId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ userId: id });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.products = wishlist.products.filter(
      (p) => p.toString() !== productId
    );
    await wishlist.save();

    res.status(200).json(wishlist);
  } catch (err) {
    res.status(400).json(err);
  }
};
