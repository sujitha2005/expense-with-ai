import { useState, useEffect } from "react";
import ExpenseForm from "../components/ExpenseForm";
import RecentEntries from "../components/RecentEntries";
import API from "../api";
import "../styles/AddExpense.css";

export default function AddExpense() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const res = await API.get("/expenses");
      setExpenses(res.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="add-expense-page">
      <div className="header-section">
        <h1 className="page-title">Add Expense</h1>
        <p className="page-subtitle">Record a new expense entry</p>
      </div>

      <ExpenseForm fetchExpenses={fetchExpenses} />

      <RecentEntries expenses={expenses} />
    </div>
  );
}
