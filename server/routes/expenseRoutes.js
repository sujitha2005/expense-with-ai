import express from "express";
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




export default router;
