import { useState } from "react";
import API from "../api";

export default function ExpenseForm({ fetchExpenses }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/expenses", {
      title,
      amount: Number(amount)
    });

    setTitle("");
    setAmount("");
    fetchExpenses();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Expense title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button type="submit">Add Expense</button>
    </form>
  );
}
