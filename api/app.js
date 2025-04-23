const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routs/userRoute");
const cookieParser = require("cookie-parser");
const authRouter = require("./routs/AuthRoute");
require("dotenv").config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
mongoose
  .connect(process.env.MONGOOSE_URI)
  .then(() => {
    console.log("conect to db");
  })
  .catch((err) => console.log(err));
app.listen(3000, () => {
  console.log("server running at port " + 3000);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
