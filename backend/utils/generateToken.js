import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: `${process.env.JWT_TOKEN_EXPIRED_IN_HOUR} hrs`,
  });
};

/**
 * Get token expired date in miliseconds
 * @returns int
 */
export const getExpiredTokenDate = () => {
  var dt = new Date();
  dt.setHours(dt.getHours() + process.env.JWT_TOKEN_EXPIRED_IN_HOUR);
  return dt.getTime();
};

export default generateToken;
