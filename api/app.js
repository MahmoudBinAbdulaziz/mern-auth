import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import userRouter from "./routs/userRoute.js";
import authRouter from "./routs/AuthRoute.js";

dotenv.config();

const app = express();

// To replace __dirname in ESM:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);

// Static files (client build)
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

// Connect DB & start server
mongoose
  .connect(process.env.MONGOOSE_URI)
  .then(() => {
    console.log("Connected to DB");
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => console.log(err));
