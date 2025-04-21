const express = require("express");
const {
  signup,
  login,
  google,
  logOut,
} = require("../controller/AuthController");
const router = express.Router();

router.post("/sign-up", signup);
router.post("/sign-in", login);
router.post("/google", google);
router.get("/log-out", logOut);
module.exports = router;
