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
  console.log(req.body, user);
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
  console.log(req.body);
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

export { authUser, registerUser };
