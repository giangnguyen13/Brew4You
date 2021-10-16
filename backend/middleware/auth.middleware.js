import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Staff from "../models/staff.model.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("_user")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Unauthorized.! Token failed");
    }
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("_staff")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await Staff.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Unauthorized.! Token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Unauthorized.! No token");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403);
    throw new Error("Forbidden.! Admin permission required");
  }
};

export {
  protect,
  admin
};