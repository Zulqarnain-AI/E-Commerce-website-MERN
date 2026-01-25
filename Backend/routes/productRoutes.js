import express from "express";
import Product from "../models/Products.js";

const router = express.Router();

// GET FEATURED PRODUCTS
router.get("/", async (req, res) => {
  const featured = req.query.featured === "true";

  const products = featured
    ? await Product.find({ isFeatured: true })
    : await Product.find();

  res.json(products);
});

export default router;
