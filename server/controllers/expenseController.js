// controllers/expenseController.js

import Expense from "../models/Expense.js";
import { categorizeExpense } from "../utils/aiCategorizer.js";


// ➕ Add Expense
export const addExpense = async (req, res) => {
  try {
    const { title, amount } = req.body;

    if (!title || !amount) {
      return res.status(400).json({ message: "Title and amount are required" });
    }

    const category = await categorizeExpense(title);

    const expense = await Expense.create({
      title,
      amount,
      category
    });

    res.status(201).json(expense);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 📥 Get All Expenses (Latest First)
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ❌ Delete Expense
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✏️ Update Expense
export const updateExpense = async (req, res) => {
  try {
    const { title, amount } = req.body;

    const existingExpense = await Expense.findById(req.params.id);

    if (!existingExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    let category = existingExpense.category;

    // Re-categorize if title changed
    if (title && title !== existingExpense.title) {
      category = await categorizeExpense(title);
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        title: title || existingExpense.title,
        amount: amount || existingExpense.amount,
        category
      },
      { new: true }
    );

    res.json(updatedExpense);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
