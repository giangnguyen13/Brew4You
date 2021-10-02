import express from "express";
import { protect } from "../middleware/auth.middleware.js";

import {
  authUser,
  registerUser,
  getUserProfile,
  addProductToWishlist,
  getUserWishlist,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/login").post(authUser);
router.route("/").post(registerUser);
router.route('/wishlist')
.get(getUserWishlist)
.put(addProductToWishlist);
router.route("/profile").get(protect, getUserProfile);

export default router;
