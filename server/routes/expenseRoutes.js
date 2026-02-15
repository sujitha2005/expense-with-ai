import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense
} from "../controllers/expenseController.js";

const router = express.Router();

// ➕ Create expense
router.post("/", addExpense);

// 📥 Get all expenses
router.get("/", getExpenses);

// ❌ Delete expense
router.delete("/:id", deleteExpense);

// ✏️ Update expense
router.put("/:id", updateExpense);


router.use(protect);


export default router;
