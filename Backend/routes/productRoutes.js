import express from "express";
import Product from "../models/Products.js";

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

export default router;
