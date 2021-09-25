/**
 * Purpose: if the constant value is used >= 2 times, place it here
 *
 * // Sample usage
 * import constants from "./config/constants.js";
 * constant.ORDER_STAGE_CART will return 'Cart' as the value
 */
const constants = Object.freeze({
  PAGE_LENGTH: 12,
  PRODUCT_RATING: {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent",
  },
});

export default constants;
