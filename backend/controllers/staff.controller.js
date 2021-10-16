import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
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
 * @access      Public
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


export {
    login,
    getProducts,
    addProduct
}