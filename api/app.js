const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGOOSE_URI)
  .then(() => {
    console.log("conect to db");
  })
  .catch((err) => console.log(err));
app.listen(3000, () => {
  console.log("server running at port " + 3000);
});
