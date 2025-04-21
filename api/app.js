const express = require("express");
require("dotenv").config();
const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("server running at port " + 3000);
});
