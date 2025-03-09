import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js"; // Ensure you have verifyToken middleware
import { checkAuthStatus } from "../controllers/authController.js"; // Create this function
import { loginUser, registerUser, logoutUser } from "../controllers/authController.js";

const router = express.Router();

// Register user
router.post("/signup", registerUser);

// Login user
router.post("/login", loginUser);

// Logout user
router.post("/logout", logoutUser);

router.get("/status", verifyToken, checkAuthStatus);



export default router;


