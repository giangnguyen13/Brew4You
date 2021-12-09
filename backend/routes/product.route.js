import express from "express";

import {
  createProduct,
  // createProductReview,
  deleteProduct,
  getProducts,
  getProductById,
  getProductRecommendation,
  // getTopProducts,
  updateProduct,
  createProductReview,
} from "../controllers/product.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// router.route("/api/products").get(getProducts); //.post(protect, admin, createProduct);
// router.route("/top").get(getTopProducts);
// router
//   .route("/:id")
//   .get(getProductsById)
//   .put(protect, admin, updateProduct)
//   .delete(protect, admin, deleteProduct);

// router.route("/:id/reviews").post(protect, createProductReview);

router
  .route("/api/products")
  .get(getProducts) // list products
  .post(createProduct); // create a new product

router
  .route("/api/products/recommendation")
  .get(protect, getProductRecommendation); // get recommended products

router
  .route("/api/products/:productId")
  .get(getProductById) // get a product by its productId
  .put(protect, updateProduct) // update a product by its productId
  .delete(protect, deleteProduct); // delete a product by its productId

router
  .route("/api/products/:productId/review")
  .post(protect, createProductReview);

export default router;
