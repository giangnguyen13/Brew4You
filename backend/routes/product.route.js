import express from "express";

import {
  // createProduct,
  // createProductReview,
  // deleteProduct,
  getProducts,
  // getProductsById,
  // getTopProducts,
  // updateProduct,
} from "../controllers/product.controller.js";
// import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts); //.post(protect, admin, createProduct);
// router.route("/top").get(getTopProducts);
// router
//   .route("/:id")
//   .get(getProductsById)
//   .put(protect, admin, updateProduct)
//   .delete(protect, admin, deleteProduct);

// router.route("/:id/reviews").post(protect, createProductReview);

export default router;
