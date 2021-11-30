import express from "express";
import {
    protect
} from "../middleware/auth.middleware.js";

import {
    getProducts,
    login,
    addProduct,
    getStaff,
    getStaffById,
    deleteStaffById,
    getOrders
} from "../controllers/staff.controller.js";


const router = express.Router();

router.route("/login").post(login);
router.route("/products")
       .get(protect, getProducts)
       .post(protect, addProduct)
router.route("/staff")
       .get(protect, getStaff)


router.route("/staff/:staffID")
         .get(protect, getStaffById)
         .delete(protect, deleteStaffById)

router.route("/orders")
         .get(protect, getOrders)

export default router;