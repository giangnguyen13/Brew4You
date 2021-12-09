import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import generateToken, {
  getExpiredTokenDate
} from "../utils/generateToken.js";
import sendGridMail from '@sendgrid/mail';

/**
 * @desc        Auth user & get token
 * @route       POST /api/user/login
 * @access      Public
 */
const authUser = asyncHandler(async (req, res) => {
  const {
    email,
    password
  } = req.body;
  const user = await User.findOne({
    email: email
  });
  if (user && (await user.matchPassword(password))) {
    res.json({
      name: `${user.firstName} ${user.lastName}`,
      address: user.address,
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
  const {
    firstName,
    lastName,
    email,
    password
  } = req.body;
  const userExist = await User.findOne({
    email: email
  });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  if (user) {
    res.json({
      firstName,
      lastName,
      email,
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
 * @route       GET /api/user/profile
 * @access      Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  console.log(`Incoming request: ${JSON.stringify(req.user)}`)
  const user = await User.findById(req.user._id);
  if (user) {
    const {
      firstName,
      lastName,
      email,
      _id,
      address,
      subscribed
    } = user
    res.json({
      firstName,
      lastName,
      email,
      _id,
      address,
      subscribed
    }).status(200);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});


/**
 * @desc        Update user profile
 * @route       PUT /api/user/profile
 * @access      Private
 */

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const {
      profile
    } = req.body
    if(profile.subscribed){
      try{
        sendGridMail.setApiKey(process.env.SENDGRID_APIKEY);
        const msg = {
            to: profile.email,
            from: process.env.SENDGRID_NO_REPLY_EMAIL,
            subject: `Brew4You - Subscription`,
            dynamicTemplateData: {
                userName: profile.firstName
            },
            templateId: process.env.SENDGRID_SUBSCRIPTION_TEMPLATE_ID
        };
        sendGridMail.send(msg);
      }catch(e){
        res.status(e.code);
      }     
    }
    await User.updateOne({
      _id: user._id
    }, {
      ...profile
    }).then(response => {
      res.json({
        error: false,
        message: 'profile updated',
        status: 200
      })
    }).catch(err => {
      console.log(`Error while trying to update user profile: ${err.message}`)
    })
  } else {
    res.status(401);
    throw new Error("Unauthorized");
  }
})


/**
 * @desc        Get user's wishlist
 * @route       GET /api/user/wishlist
 * @access      Private
 */

const getUserWishlist = asyncHandler(async (req, res) => {
  const userId = req.query.user
  const user = await User.findOne({
    _id: userId
  }, {
    wishlist: 1
  }).populate('wishlist');
  if (user) {
    res.status(200).json({
      wishlist: user.wishlist
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }

})

/**
 * @desc        Add product to wishlist
 * @route       PUT /api/user/wishlist
 * @access      Private
 */

const addProductToWishlist = asyncHandler(async (req, res) => {
  const {
    product,
    user
  } = req.body
  const userExist = await User.findById(user);
  if (userExist) {
    const productInWishlist = await User.findOne({
      wishlist: {
        $in: [product._id]
      }
    }).populate('wishlist')
    //Product is already in the wishlist
    if (productInWishlist) {
      res.json({
        error: true,
        code: 400,
        message: 'Product already in your wishlist'
      })
    } else {
      await User.updateOne({
        _id: user
      }, {
        $push: {
          wishlist: product
        }
      }).then(response => {
        res.status(200).json({
          error: false,
          code: 200,
          message: 'product added to wishlist'
        })
      })
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }

})

/**
 * @desc        Remove product fro wishlist
 * @route       DELETE /api/user/wishlist
 * @access      Private
 */
const removeProductFromWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const {
      _id
    } = req.body
    console.log(`Product id: ${_id}`)
    await User.updateOne({
      _id: user._id
    }, {
      $pull: {
        wishlist: _id
      }
    }).then(response => {
      console.log(`Product removed from wishlist ${JSON.stringify(response)}`)
      res.status(200).json({
        user
      })
    }).catch(err => {
      console.log(`An error occurred while trying to remove the product from the wishlist: ${err.message}`)
      res.status(err.code)

    })
    res.status(200)
  } else {
    res.status(401);
    throw new Error("Unauthorized");
  }

})

/**
 * @desc        Update User password
 * @route       patch /api/user/password
 * @access      Private
 */

const updateUserPassword = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      const {
        password
      } = req.body
      const {
        currentPassword,
        newPassword,
        confirmPassword
      } = password
      if (await user.matchPassword(currentPassword) && newPassword === confirmPassword) {
        user.password = newPassword
        user.save()
        res.json({
          error: false,
          message: 'Password updated',
          code: 200
        });
      } else {
        res.json({
          error: true,
          message: `Incorrect password`,
          code: 401
        }).status(401);
      }
    }

  } catch (err) {
    res.json({
      error: true,
      message: err.message,
      code: err.code
    }).status(err.code);
    console.log(err.message)
  }
})

/**
 * @desc        Send subscription
 * @route       patch /api/user/send-subscription-mail
 * @access      Private
 */

const sendSubscriptionMail = asyncHandler(async (req, res) => {
  const { email } = req.body
  try {
    sendGridMail.setApiKey(process.env.SENDGRID_APIKEY);
    const msg = {
        to: email,
        from: process.env.SENDGRID_NO_REPLY_EMAIL,
        subject: `Brew4You - Subscription`,
        dynamicTemplateData: {
            userName: email
        },
        templateId: process.env.SENDGRID_SUBSCRIPTION_TEMPLATE_ID
    };
    sendGridMail.send(msg);
    res.json({
      message: 'Subscription mail sent',
      code: 200
    });
    } catch (err) {
      console.log("Error sending the email: " + err);
      res.json({
        error: true,
        message: err.message,
        code: err.code
      }).status(err.code);
    }
})

export {
  authUser,
  updateUserPassword,
  registerUser,
  getUserProfile,
  updateUserProfile,
  addProductToWishlist,
  getUserWishlist,
  removeProductFromWishlist,
  sendSubscriptionMail
};