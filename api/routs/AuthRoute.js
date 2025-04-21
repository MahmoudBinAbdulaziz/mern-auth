const express = require("express");
const {
  signup,
  login,
  google,
  logOut,
} = require("../controller/AuthController");
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", login);
router.post("/google", google);
router.get("/log-out", logOut);
module.exports = router;
