export const END_POINTS = {
  /* PRODUCT ROUTE */
  // GET
  GET_ALL_PRODUCTS: "/products",

  GET_PRODUCT_BY_ID: "/products",

  GET_RECOMMENDED_PRODUCTS: "/products/recommendation",

  // POST
  CREATE_PRODUCT: "/products",

  // PUT
  UPDATE_PRODUCT_BY_ID: "/products",

  // DELETE
  DELETE_PRODUCT_BY_ID: "/products",

  // DELETE
  POST_PRODUCT_REVIEW: "/products",

  /* USER ROUTE */

  //GET
  GET_USER_WISHLIST: "/user/wishlist",
  GET_USER_PROFILE: "/user/profile",
  SUBSCRIBE_MAIL: "/user/send-subscription-mail",

  //PUT
  ADD_PRODUCT_WISHLIST: "/user/wishlist",
  UPDATE_USER_PROFILE: "/user/profile",
  UPDATE_USER_PASSWORD: "/user/profile/password",

  //DELETE
  DELETE_PRODUCT_WISHLIST: "/user/wishlist",
  //POST
  POST_USER_LOGIN: "/user/login",
  POST_USER_SIGNUP: "/user",

  /* STRIPE ROUTES */

  //POST
  CREATE_PAYMENT_INTENT: "/stripe/create-payment-intent",

  /* ORDER ROUTE */
  GET_ORDER_BY_ID: "/orders",
  UPDATE_ORDER_STATUS: "/orders",

  /* ORDER ROUTE */
  UPDATE_ANONYMOUS_ORDER_STATUS: "/anonymous_orders",
};
