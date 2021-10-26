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
    deleteStaffById
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

export default router;