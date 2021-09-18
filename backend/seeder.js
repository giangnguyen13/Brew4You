import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import staffs from "./data/staffs.js";
import User from "./models/user.model.js";
import Product from "./models/product.model.js";
import Staff from "./models/staff.model.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Staff.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});

    await User.insertMany(users);

    const staffUser = await Staff.insertMany(staffs);
    const creatorId = staffUser[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, updatedBy: creatorId };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data imported");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Staff.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});

    console.log("Data destroyed");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "--d") {
  destroyData();
} else {
  importData();
}
