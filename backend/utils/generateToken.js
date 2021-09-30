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
  let dt = new Date();
  const added_hour =
    dt.getHours() + parseInt(process.env.JWT_TOKEN_EXPIRED_IN_HOUR);

  dt.setHours(added_hour);
  return dt.getTime();
};

export default generateToken;
