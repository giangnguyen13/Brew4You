import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import staffs from "./data/staffs.js";
import User from "./models/user.model.js";
import Product from "./models/product.model.js";
import Staff from "./models/staff.model.js";
import connectDB from "./config/db.js";
dotenv.config();

export const importData = async () => {
  try {
    await connectDB()
    await destroyData()
    await User.insertMany(users).then().catch(e => console.log(e.message));
    const staffUser = await Staff.insertMany(staffs).then().catch(e => console.log(e.message));
    const creatorId = staffUser[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, updatedBy: creatorId };
    });
    console.log(sampleProducts)
    await Product.insertMany(sampleProducts);

    console.log("Data imported");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export const destroyData = async () => {
  try {
    await Staff.deleteMany({}).then().catch(e => console.info(e.message));
    await Product.deleteMany({}).then().catch(e => console.info(e.message));
    await User.deleteMany({}).then().catch(e => console.info(e.message));

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
