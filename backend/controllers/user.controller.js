import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import generateToken, { getExpiredTokenDate } from "../utils/generateToken.js";

/**
 * @desc        Auth user & get token
 * @route       POST /api/users/login
 * @access      Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      name: `${user.firstName} ${user.lastName}`,
      token: generateToken(user._id),
      expired: getExpiredTokenDate(),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

/**
 * @desc        Register new user
 * @route       POST /api/users
 * @access      Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const userExist = await User.findOne({ email: email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });

  if (user) {
    res.json({
      firstName: firstName,
      lastName: lastName,
      email: email,
      token: generateToken(user._id),
      expired: getExpiredTokenDate(),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * @desc        Get user profile
 * @route       GET /api/users/profile
 * @access      Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      _id: user._id
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @desc        Get user's wishlist
 * @route       GET /api/users/wishlist
 * @access      Private
 */

 const getUserWishlist = asyncHandler(async (req, res) => {
  const userId = req.query.user
  const user = await User.findOne({_id: userId}, {wishlist: 1}).populate('wishlist');
  if (user) {
    res.status(200).json({ wishlist: user.wishlist });
  } else {
    res.status(404);
    throw new Error("User not found");
  }

})

/**
 * @desc        Add product to wishlist
 * @route       PUT /api/users/wishlist
 * @access      Private
 */

const addProductToWishlist = asyncHandler(async (req, res) => {
  const {product, user} = req.body
  const userExist = await User.findById(user);
  if (userExist) {
    await User.updateOne({_id: user}, { $push: {wishlist: product} }).then(response => {
      console.log(response)
    })
  } else {
    res.status(404);
    throw new Error("User not found");
  }

})

export { authUser, registerUser, getUserProfile, addProductToWishlist, getUserWishlist };
