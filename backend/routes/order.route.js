import express from "express";
import { protect } from "../middleware/auth.middleware.js";

import { createOrder, getOrderById, updateOrderStatus } from "../controllers/order.controller.js";

const router = express.Router();

router.route("/api/orders")
.post(protect, createOrder);
router.route("/api/orders/:orderId")
.get(getOrderById)
.patch(protect, updateOrderStatus)


export default router;
