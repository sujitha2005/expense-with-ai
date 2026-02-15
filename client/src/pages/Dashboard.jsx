import { useEffect, useState } from "react";
import API from "../api";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseChart";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const res = await API.get("/expenses");
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <ExpenseForm fetchExpenses={fetchExpenses} />
      <ExpenseChart expenses={expenses} />
      <ExpenseList expenses={expenses} />
    </div>
  );
}
