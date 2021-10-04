import express from "express";
import { protect } from "../middleware/auth.middleware.js";

import {
  authUser,
  registerUser,
  getUserProfile,
  addProductToWishlist,
  getUserWishlist,
  removeProductFromWishlist,
  updateUserProfile,
  updateUserPassword
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/login").post(authUser);
router.route("/profile/password").put(protect, updateUserPassword)
router.route("/").post(registerUser);
router.route('/wishlist')
.get(getUserWishlist)
.put(addProductToWishlist)
.delete(protect, removeProductFromWishlist)
router.route("/profile")
.get(protect, getUserProfile)
.put(protect, updateUserProfile)

export default router;
