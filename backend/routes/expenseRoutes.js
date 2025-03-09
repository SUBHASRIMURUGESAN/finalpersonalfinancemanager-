import express from "express";
import { getExpenses, addExpense, deleteExpense } from "../controllers/expenseController.js";
import { verifyToken } from "../middleware/authMiddleware.js"; // Ensure this middleware exists

const router = express.Router();

// Protect all expense routes
router.get("/", verifyToken, getExpenses);
router.post("/", verifyToken, addExpense);
router.delete("/:id", verifyToken, deleteExpense);

export default router;
