import dotenv from "dotenv";
import connectDB from "./config/db.js";

// import sample data
import users from "./data/users.js";
import products from "./data/products.js";
import staffs from "./data/staffs.js";
import productAttributes from "./data/productAttributes.js";

// import Model
import User from "./models/user.model.js";
import Product from "./models/product.model.js";
import Staff from "./models/staff.model.js";
import ProductAttribute from "./models/productAttribute.model.js";
import Order from "./models/order.model.js";

dotenv.config();
/**
 * In case of issue with database
 * Drop the database before run seeding command
 */
export const importData = async () => {
  try {
    await connectDB();
    await destroyData();
    await User.insertMany(users)
      .then()
      .catch((e) => console.log(e.message));
    const staffUser = await Staff.insertMany(staffs)
      .then()
      .catch((e) => console.log(e.message));
    const creatorId = staffUser[0]._id;
    let attributes = await ProductAttribute.insertMany(productAttributes);

    attributes = attributes.map((item) => item._id);

    const sampleProducts = products.map((product) => {
      return {
        ...product,
        updatedBy: creatorId,
        productAttributes: attributes,
      };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data imported");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export const destroyData = async () => {
  try {
    await connectDB();
    await Staff.deleteMany({})
      .then()
      .catch((e) => console.info(e.message));
    await Product.deleteMany({})
      .then()
      .catch((e) => console.info(e.message));
    await User.deleteMany({})
      .then()
      .catch((e) => console.info(e.message));
    await ProductAttribute.deleteMany({})
      .then()
      .catch((e) => console.info(e.message));
    await Order.deleteMany({})
      .then()
      .catch((e) => console.info(e.message));

    console.log("Data destroyed");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "--d") {
  destroyData();
}
if (process.argv[2] === "--i") {
  importData();
}
