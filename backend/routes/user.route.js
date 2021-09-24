import express from "express";

import { authUser, registerUser } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/login").post(authUser);
router.route("/").post(registerUser);

export default router;
