import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";

// Load ENV variable to process.env variable
dotenv.config();

const app = express();
const __dirname = path.resolve();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

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

const PORT = process.env.SERVER_PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode at port ${PORT}`)
);
