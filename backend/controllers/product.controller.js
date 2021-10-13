// Why use asyncHandler, read -> https://zellwk.com/blog/async-await-express/
import asyncHandler from "express-async-handler";
import Product from "../models/product.model.js";
import ProductAttribute from "../models/productAttribute.model.js";

/**
 * @desc        Fetch all products
 * @route       GET /api/products
 * @access      Public
 */
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products });
});

/**
 * @desc        Fetch product by ID
 * @route       GET /api/products/:productId
 * @access      Public
 */
const getProductById = asyncHandler(async (req, res, next) => {
  const id = req.params.productId;
  await Product.findOne({ _id: id })
    .populate("productAttributes")
    .exec((err, product) => {
      if (err) {
        console.log(err);
        return next(err);
      } else {
        res.status(200).json({ product });
      }
    });
});

/**
 * @desc        Update product by ID
 * @route       PUT /api/products/:productId
 * @access      Private/admin`
 */
const updateProduct = asyncHandler(async (req, res, next) => {
  let query = { _id: req.params.productId };

  await Product.findOneAndUpdate(
    query,
    req.body,
    { new: true },
    (err, product) => {
      if (err) {
        console.log(err);
        return next(err);
      } else {
        res.status(200).json({ product });
      }
    }
  );
});

/**
 * @desc        Delete product by ID
 * @route       DELETE /api/products/:productId
 * @access      Private/admin
 */
const deleteProduct = asyncHandler(async (req, res, next) => {
  let query = { _id: req.params.productId };

  await Product.findOneAndDelete(query, (err, product) => {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log("product deleted");
      res.status(200).json({ product });
    }
  });
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
    res.status(200).json({ message: "Review created" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProduct,
  createProductReview,
};
