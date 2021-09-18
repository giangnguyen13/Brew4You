import bcrypt from "bcryptjs";
import constants from "../config/constants.js";

const staffs = [
  {
    firstName: "Admin",
    lastName: "User",
    role: constants.ROLE_ADMIN,
    email: "admin@brew4you.ca",
    password: bcrypt.hashSync("welcome", 10),
  },
];

export default staffs;
