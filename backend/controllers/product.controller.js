// Why use asyncHandler, read -> https://zellwk.com/blog/async-await-express/
import asyncHandler from "express-async-handler";
import Product from "../models/product.model.js";
import ProductAttribute from "../models/productAttribute.model.js";
import Staff from "../models/staff.model.js";
import User from "../models/user.model.js";
import Order from "../models/order.model.js";
/**
 * @desc        Fetch all products
 * @route       GET /api/products
 * @access      Public
 */
const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ products, success: true });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message, code: 500 });
  }
});

/**
 * @desc        Fetch product by ID
 * @route       GET /api/products/:productId
 * @access      Public
 */
const getProductById = asyncHandler(async (req, res, next) => {
  try {
    const _id = req.params.productId;
    const product = await Product.findOne({ _id }).populate(
      "productAttributes"
    );
    if (product) {
      res.status(200).json({ product, success: true, code: 200 });
    } else {
      res.status(400).json({
        message: "Couldn't find product with specified ID.",
        code: 400,
        error: true,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message, code: 500, error: true });
  }
});

/**
 * @desc        Update product by ID
 * @route       PUT /api/products/:productId
 * @access      Private/admin`
 */
const updateProduct = asyncHandler(async (req, res, next) => {
  try {
    const staff = await Staff.findById(req.user._id);
    if (staff) {
      const _id = req.params.productId;
      const updatedProduct = await Product.findOneAndUpdate({ _id }, req.body);
      res
        .status(200)
        .json({ product: updatedProduct, success: true, code: 200 });
    } else {
      res.status(401).json({ error: true, message: "Unauthorized", code: 401 });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: true, message: err.message, code: 500 });
  }
});

/**
 * @desc        Delete product by ID
 * @route       DELETE /api/products/:productId
 * @access      Private/admin
 */
const deleteProduct = asyncHandler(async (req, res, next) => {
  try {
    const staff = await Staff.findById(req.user._id);
    const _id = req.params.productId;
    if (staff) {
      await Product.deleteOne({ _id });
      res
        .status(200)
        .json({ success: true, code: 200, message: "Product deleted" });
    } else {
      res.status(401).json({ error: true, message: "Unauthorized", code: 401 });
    }
  } catch (err) {
    res.status(500).json({ error: true, message: err.message, code: 500 });
  }
});

/**
 * @desc        Create a product
 * @route       POST /api/products
 * @access      Private/admin
 */
const createProduct = asyncHandler(async (req, res, next) => {
  var product = new Product(req.body);
  product.save(function (err, product) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      res.status(200).json({ product });
    }
  });
});

/**
 * @desc        Create a product review
 * @route       POST /api/products/:productId/review
 * @access      Private
 */
const createProductReview = asyncHandler(async (req, res, next) => {
  let query = { _id: req.params.productId };
  const product = await Product.findById(query);
  if (product) {
    let review = {
      ...req.body,
      user: req.user._id,
      name: `${req.user.firstName} ${req.user.lastName}`,
    };
    product.reviews.push(review);

    const numReviews = product.reviews.length;

    product.numReviews = numReviews;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) / numReviews;

    await product.save();
    res.status(200).json(review);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

/**
 * @desc        Create a product review
 * @route       POST /api/products/recommendation
 * @access      Private
 */
const getProductRecommendation = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user) {
    let orders = await Order.find({ user: user._id })
      .sort({ updatedAt: "asc" })
      .select("orderItems");
    let products = [];
    orders.forEach((o) => {
      products = [...o.orderItems, ...products];
    });
    // If users have not order enough, randomize the recommendation
    // Otherwise take latest 3 items from users' order
    if (products.length < 3) {
      let recommendedProducts = await Product.find({});
      recommendedProducts = recommendedProducts
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      res.status(200).json({ products: recommendedProducts, success: false });
    } else {
      const recommendation = products.map((p) => p.product);
      let recommendedProducts = await Product.find()
        .where("_id")
        .in(recommendation.slice(0, 3));
      res.status(200).json({ products: recommendedProducts, success: true });
    }
  } else {
    res.status(401).json({ error: true, message: `Unauthorized`, code: 401 });
  }
});

export {
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProduct,
  createProductReview,
  getProductRecommendation,
};
