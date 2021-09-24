import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";
import productRoutes from "./routes/product.route.js";
import userRoutes from "./routes/user.route.js";

// Load ENV variable to process.env variable
dotenv.config();

connectDB();

const app = express();
const __dirname = path.resolve();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/upload", uploadRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/frontend/build/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.SERVER_PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode at port ${PORT}`)
);
