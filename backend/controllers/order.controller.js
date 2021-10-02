import asyncHandler from "express-async-handler";
import Order from "../models/order.model.js";
import constants from "../config/constants.js";

/**
 * @desc        Create new order
 * @route       POST /api/orders/
 * @access      Public
 */
const createOrder = asyncHandler(async (req, res) => {
  try {
    const orderItems = req.body;
    const itemPrice = orderItems
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current);

    const orderStatus = {
      stage: constants.ORDER_STAGE_CREATED,
      actionAt: Date.now(),
    };

    const taxPrice = itemPrice * constants.TAX_RATE;
    const shippingPrice = itemPrice * constants.SHIPPING_RATE;
    const totalPrice = taxPrice + shippingPrice + itemPrice;

    const order = await Order.create({
      orderItems: orderItems,
      itemsPrice: itemPrice.toFixed(2),
      taxPrice: taxPrice.toFixed(2),
      shippingPrice: shippingPrice.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
      orderStatus: [orderStatus],
    });
    res.json(order._id);
  } catch (error) {
    res.json(error);
  }
});

/**
 * @desc        Create new order
 * @route       GET /api/orders/:orderId
 * @access      Public
 */
const getOrderById = asyncHandler(async (req, res) => {
  try {
    const id = req.params.orderId;
    const order = await Order.findById(id);
    res.json(order);
  } catch (error) {
    res.json(error);
  }
});

export { createOrder, getOrderById };
