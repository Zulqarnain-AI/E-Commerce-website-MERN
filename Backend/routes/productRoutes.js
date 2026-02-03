import express from "express";
import Product from "../models/Products.js";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET FEATURED PRODUCTS
router.get("/", async (req, res) => {
  const { category, maxPrice, keyword } = req.query;

  let query = {};

  if (category) query.category = category;
  if (maxPrice) query.price = { $lte: maxPrice };
  if (keyword)
    query.name = { $regex: keyword, $options: "i" };

  const products = await Product.find(query);
  res.json(products);
});
// GET SINGLE PRODUCT
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select(
      "-image.data"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

export default router;
