import express from "express";
import { signup, login, google, logOut } from "../controller/AuthController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", login);
router.post("/google", google);
router.get("/log-out", logOut);

export default router;
