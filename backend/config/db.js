import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB connected: ${process.env.MONGO_URI}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
