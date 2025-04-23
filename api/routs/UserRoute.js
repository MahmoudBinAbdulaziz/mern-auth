const express = require("express");
const { updateUser, deleteUser } = require("../controller/userCotroller");
const { verifyToken } = require("../utils/verifyToken");
const router = express.Router();

router.put("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
module.exports = router;
