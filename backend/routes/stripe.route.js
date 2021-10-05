import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { createPaymentIntent } from "../controllers/stripe.controller.js";

const router = express.Router();

router.route("/create-payment-intent").post(createPaymentIntent);


export default router;
