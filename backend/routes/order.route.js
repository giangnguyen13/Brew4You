import express from "express";
import { protect } from "../middleware/auth.middleware.js";

import {
  createOrder,
  createAnonymousOrder,
  getOrderById,
  updateOrderStatus,
  updateAnonymousOrderStatus,
} from "../controllers/order.controller.js";

const router = express.Router();

router.route("/api/orders").post(protect, createOrder);

router.route("/api/anonymous_orders").post(createAnonymousOrder);
router
  .route("/api/anonymous_orders/:orderId")
  .patch(updateAnonymousOrderStatus);

router
  .route("/api/orders/:orderId")
  .get(getOrderById)
  .patch(protect, updateOrderStatus);

export default router;
