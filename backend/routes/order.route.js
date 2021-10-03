import express from "express";

import { createOrder, getOrderById } from "../controllers/order.controller.js";

const router = express.Router();

router.route("/api/orders").post(createOrder); // create a new product

router.route("/api/orders/:orderId").get(getOrderById); // get order by id

export default router;
