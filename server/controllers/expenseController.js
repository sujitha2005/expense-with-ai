import Expense from "../models/Expense.js";
import { categorizeExpense } from "../utils/aiCategorizer.js";

export const addExpense = async (req, res) => {
  try {
    const { title, amount } = req.body;

    const category = await categorizeExpense(title);

    const expense = await Expense.create({
      title,
      amount,
      category
    });

    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExpenses = async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
};
