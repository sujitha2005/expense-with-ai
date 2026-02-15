import { createContext, useContext, useState } from "react";
import axios from "axios";

const CATEGORIES = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Health", "Education", "Other"];

const sampleExpenses = [
  { id: "1", title: "Groceries", amount: 2500, date: "2025-02-01", category: "Food" },
  { id: "2", title: "Uber Ride", amount: 350, date: "2025-02-02", category: "Transport" },
  { id: "3", title: "Netflix Subscription", amount: 649, date: "2025-02-03", category: "Entertainment" },
  { id: "4", title: "Electricity Bill", amount: 1800, date: "2025-02-04", category: "Bills" },
  { id: "5", title: "New Shoes", amount: 3200, date: "2025-02-05", category: "Shopping" },
  { id: "6", title: "Gym Membership", amount: 1500, date: "2025-01-15", category: "Health" },
  { id: "7", title: "Online Course", amount: 4999, date: "2025-01-20", category: "Education" },
  { id: "8", title: "Restaurant Dinner", amount: 1200, date: "2025-01-25", category: "Food" },
  { id: "9", title: "Bus Pass", amount: 500, date: "2025-01-10", category: "Transport" },
  { id: "10", title: "Movie Tickets", amount: 600, date: "2025-02-10", category: "Entertainment" },
  { id: "11", title: "Water Bill", amount: 450, date: "2025-02-08", category: "Bills" },
  { id: "12", title: "Books", amount: 850, date: "2025-02-12", category: "Education" },
];

const ExpenseContext = createContext(undefined);

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(sampleExpenses);
  const [loading, setLoading] = useState(false);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/expenses");
      setExpenses(res.data);
    } catch {
      console.log("Using local expense data");
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
      category: expense.category || CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
    };
    try {
      await axios.post("/api/expenses", expense);
    } catch {
    }
    setExpenses((prev) => [newExpense, ...prev]);
  };

  return (
    <ExpenseContext.Provider value={{ expenses, loading, addExpense, fetchExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const ctx = useContext(ExpenseContext);
  if (!ctx) throw new Error("useExpenses must be used within ExpenseProvider");
  return ctx;
};

export { CATEGORIES };


