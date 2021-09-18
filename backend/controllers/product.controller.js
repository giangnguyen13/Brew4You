// Why use asyncHandler, read -> https://zellwk.com/blog/async-await-express/
import asyncHandler from "express-async-handler";
import Product from "../models/product.model.js";

/**
 * @desc        Fetch all products
 * @route       GET /api/products
 * @access      Public
 */
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).limit(12);

  res.json({ products });
});

export { getProducts };
