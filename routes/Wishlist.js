const express = require("express");
const { getWishlist, addToWishlist, removeFromWishlist } = require("../controller/WishlistController");
// const { getWishlist, addToWishlist, removeFromWishlist } = require("../controller/Wishlist");

const router = express.Router();

router.get("/", getWishlist);
router.post("/", addToWishlist);
router.delete("/:productId", removeFromWishlist);

exports.router = router;
