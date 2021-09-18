/**
 * Purpose: if the constant value is used >= 2 times, place it here
 * Import in controller
 * var constant = require('../../config/constant');
 *
 * // Sample usage
 * import constants from "./config/constants.js";
 * constant.ORDER_STAGE_CART will return 'Cart' as the value
 */
const constants = Object.freeze({
  ORDER_STAGE_CART: "Cart",
  ORDER_STAGE_PAID: "Paid",
  ORDER_STATUS_ORDERED: 1,
  ORDER_STATUS_READY: 2,
  ORDER_STATUS_SHIPPED: 3,
  ORDER_STATUS_DELIVERED: 4,
  JWT_EXPIRY_SECONDS: 300,
  TRACKING_RAND_LENGTH: 10,
  TAX_RATE: 1.13,
  ROLE_ADMIN: "Administrator",
});

export { constants as default };
