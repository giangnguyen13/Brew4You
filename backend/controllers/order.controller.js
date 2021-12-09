import asyncHandler from "express-async-handler";
import Order from "../models/order.model.js";
import constants from "../config/constants.js";
import User from "../models/user.model.js";

/**
 * @desc        Create new order
 * @route       POST /api/orders/
 * @access      Private
 */
const createOrder = asyncHandler(async (req, res) => {
  try {
    const orderItems = req.body;
    const user = await User.findById(req.user._id);
    if (user) {
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
        user,
        orderItems: orderItems,
        itemsPrice: itemPrice.toFixed(2),
        taxPrice: taxPrice.toFixed(2),
        shippingPrice: shippingPrice.toFixed(2),
        totalPrice: totalPrice.toFixed(2),
        orderStatus: [orderStatus],
      });
      res.json(order._id);
    } else {
      res.status(401).json({ error: true, message: "Unauthorized", code: 401 });
    }
  } catch (error) {
    res.json(error);
  }
});
/**
 * @desc        Create new order by anonymous user
 * @route       POST /api/orders/
 * @access      Public
 */
const createAnonymousOrder = asyncHandler(async (req, res) => {
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
    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    console.log(error);
    res.status(error.code);
    throw new Error(error.message);
  }
});

/**
 * @desc        Update Order Status
 * @route       PATCH /api/orders/:orderId/status
 * @access      Private
 */

const updateOrderStatus = asyncHandler(async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.query;
    const user = await User.findById(req.user._id);
    if (user) {
      const order = await Order.findById(orderId).populate("user");
      if (order && order.user.email === user.email) {
        const orderStatus = {
          stage: status === "paid" && constants.ORDER_STAGE_PAID,
          actionAt: Date.now(),
        };
        await Order.updateOne({ _id: order._id }, { $push: { orderStatus } });
        res
          .status(200)
          .json({ error: false, message: `${orderId} updated`, status: 200 });
      } else {
        res.status(404).json({
          error: true,
          message: `Couldn't find order ${orderId}`,
          status: 404,
        });
      }
    } else {
      res.status(401).json({ error: true, message: `Unauthorized`, code: 401 });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: true, message: err.message, code: 500 });
  }
});
/**
 * @desc        Update Order Status
 * @route       PATCH /api/orders/:orderId/status
 * @access      Public
 */

const updateAnonymousOrderStatus = asyncHandler(async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.query;
    const order = await Order.findById(orderId);
    if (order) {
      const orderStatus = {
        stage: status === "paid" && constants.ORDER_STAGE_PAID,
        actionAt: null,
      };
      await Order.updateOne({ _id: order._id }, { $push: { orderStatus } });
      res
        .status(200)
        .json({ error: false, message: `${orderId} updated`, status: 200 });
    } else {
      res.status(404).json({
        error: true,
        message: `Couldn't find order ${orderId}`,
        status: 404,
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: true, message: err.message, code: 500 });
  }
});

export {
  createOrder,
  createAnonymousOrder,
  getOrderById,
  updateOrderStatus,
  updateAnonymousOrderStatus,
};
