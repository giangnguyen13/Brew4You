import bcrypt from "bcryptjs";

const users = [
  {
    firstName: "Brew4You",
    lastName: "User",
    email: "brew4you.user@gmail.com",
    password: bcrypt.hashSync("welcome", 10),
  },
];

export default users;
