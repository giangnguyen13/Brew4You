import express from "express";
import {
    protect
} from "../middleware/auth.middleware.js";

import {
    getProducts,
    login,
    addProduct
} from "../controllers/staff.controller.js";


const router = express.Router();

router.route("/login").post(login);
router.route("/products")
       .get(protect, getProducts)
       .post(protect, addProduct)


export default router;