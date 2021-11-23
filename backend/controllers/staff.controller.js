import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import Order from '../models/order.model.js';
import Staff from "../models/staff.model.js"

import generateToken, {
    getExpiredTokenDate
} from "../utils/generateToken.js";
import Product from "../models/product.model.js";

/**
 * @desc        Auth admin & get token
 * @route       POST /api/admin/login
 * @access      Public
 */
const login = asyncHandler(async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body;

        console.log(`Incoming request ${JSON.stringify(req.body)}`)

        const staff = await Staff.findOne({
            email: username
        })
        if (staff && (await staff.matchPassword(password))) {
            res.status(200).json({
                name: `${staff.firstName} ${staff.lastName}`,
                email: staff.email,
                token: generateToken(staff._id),
                expired: getExpiredTokenDate(),
            })
        } else {
            res.status(500).json({
                error: true,
                status: 500,
                message: "Invalid login credentials"
            })
        }
    } catch (err) {
        res.status(err.code || 500).json({
            error: true,
            status: err.code || 500,
            message: err.message
        })
    }

}); 



/**
 * @desc        Add a new product
 * @route       POST /api/admin/products
 * @access      Private
 */

const addProduct = asyncHandler(async (req, res) => {
    try{
        if(req.user) {
            const staff = await Staff.findById(req.user._id)
            if(staff) {
                const {title, description, price, category, image} = req.body
                const newProduct = new Product({title, description, price: +price, category, image, updatedBy: staff})
                await newProduct.save()
                res.status(200).json({product: newProduct, success: true, code: 200})
            }
            else{
                res.status(401).json({error: true, code: 401, message: 'Unauthorized'})

            }
          
        }

    }catch(err) {
        res.status(500).json({error: true, code: 500, message: err.message})

    }
})

/**
 * @desc        List all the products
 * @route       POST /api/admin/products
 * @access      private
 */
const getProducts = asyncHandler(async (req, res) => {
    try {
        if (req.user) {
            const products = await Product.find({})
            res.status(200).json({
                products,
                success: true,
                code: 200
            })
        } else {
            res.status(401).json({
                error: true,
                code: 401,
                message: 'Unauthorized'
            })
        }
    } catch (err) {
        res.status(err.code || 500).json({
            error: true,
            status: err.code || 500,
            message: err.message
        })
    }

});


/**
 * @desc        List all the orders
 * @route       POST /api/admin/orders
 * @access      private
 */
 const getOrders = asyncHandler(async (req, res) => {
    try {
        if (req.user) {
            const orders = await Order.find({}).populate('user', {password: 0})
            console.log(`Order list: ${JSON.stringify(orders)}`)
            res.status(200).json({
                orders,
                success: true,
                code: 200
            })
        } else {
            res.status(401).json({
                error: true,
                code: 401,
                message: 'Unauthorized'
            })
        }
    } catch (err) {
        console.log(err.message)
        res.status(err.code || 500).json({
            error: true,
            status: err.code || 500,
            message: err.message
        })
    }

});

/**
 * @desc        List all the staff
 * @route       POST /api/admin/staff
 * @access      private
 */
 const getStaff = asyncHandler(async (req, res) => {
    try {
        if (req.user) {
            const staff = await Staff.find({}, {password: 0})
            res.status(200).json({
                staff,
                success: true,
                code: 200
            })
        } else {
            res.status(401).json({
                error: true,
                code: 401,
                message: 'Unauthorized'
            })
        }
    } catch (err) {
        res.status(err.code || 500).json({
            error: true,
            status: err.code || 500,
            message: err.message
        })
    }

});

/**
 * @desc        Fetch staff by ID
 * @route       GET /api/admin/:staffId
 * @access      private
 */
 const getStaffById = asyncHandler(async (req, res, next) => {
    try {
      const _id = req.params.staffID;
      const staff = await Staff.findOne({_id})
      if(staff) {
        res.status(200).json({ staff, success: true, code:200 });
      }
      else{
        res.status(400).json({ message: "Couldn't find staff with specified ID.", code: 400, error: true });
  
      }
    } catch (err) {
      res.status(500).json({message: err.message, code: 500, error: true})
    }
  
  });

  /**
 * @desc        Delete staff by ID
 * @route       DELETE /api/admin/:staffId
 * @access      private
 */
 const deleteStaffById = asyncHandler(async (req, res, next) => {
    try {
      const _id = req.params.staffID;
      const staff = await Staff.deleteOne({_id})
      if(staff) {
        res.status(200).json({success: true, code:200, message: 'Staff deleted' });
      }
      else{
        res.status(400).json({ message: "Couldn't find staff with specified ID.", code: 400, error: true });
  
      }
    } catch (err) {
      res.status(500).json({message: err.message, code: 500, error: true})
    }
  
  });


export {
    login,
    getProducts,
    addProduct,
    getStaff,
    getStaffById,
    deleteStaffById,
    getOrders
}