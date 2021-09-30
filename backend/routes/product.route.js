import express from "express";

import {
  createProduct,
  // createProductReview,
  deleteProduct,
  getProducts,
  getProductById,
  // getTopProducts,
  updateProduct,
} from "../controllers/product.controller.js";
// import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// router.route("/api/products").get(getProducts); //.post(protect, admin, createProduct);
// router.route("/top").get(getTopProducts);
// router
//   .route("/:id")
//   .get(getProductsById)
//   .put(protect, admin, updateProduct)
//   .delete(protect, admin, deleteProduct);

// router.route("/:id/reviews").post(protect, createProductReview);

// list products
router.route("/api/products")
  .get(getProducts);

// create a new product
router.route("/api/products")
  .post(createProduct);

// find one product by its productId
router.route("/api/products/:productId")
  .get(getProductById);

// update one product by its product id
router.route("/api/products/:productId")
  .put(updateProduct);

// delete one product by its product id
router.route("/api/products/:productId")
  .delete(deleteProduct);

export default router;
