import express from "express";
import { signup, login } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", signup); // Signup
router.post("/login", login);   // Login
// router.post("/logout", logout); // Logout (Optional)

export default router;