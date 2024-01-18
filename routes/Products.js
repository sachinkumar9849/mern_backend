const express = require("express");
const {
  createProduct,
  fetchAllProduct,
  fetchAllProducts,
  fetchProductById,
  updateProduct,
  searchProductController,
} = require("../controller/Product");

const router = express.Router();

router
  .post("/", createProduct)
  .get("/", fetchAllProducts)
  .get("/:id", fetchProductById)
  .patch("/:id", updateProduct)
  .get("/search/:keyword", searchProductController);

exports.router = router;
