const express = require("express");
const { updateUser, deleteUser } = require("../controller/userCotroller");
const router = express.Router();

router.patch("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
module.exports = router;
