import express from 'express';

import {
    createProduct,
    // createProductReview,
    deleteProduct,
    getProducts,
    getProductById,
    // getTopProducts,
    updateProduct,
} from '../controllers/product.controller.js';
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


router.route('/api/products')
  .get(getProducts)             // list products
  .post(createProduct);       // create a new product

// find one product by its productId
router.route('/api/products/:productId')
  .get(getProductById)        // get a product by its productId
  .put(updateProduct)         // update a product by its productId
  .delete(deleteProduct);     // delete a product by its productId

export default router;
