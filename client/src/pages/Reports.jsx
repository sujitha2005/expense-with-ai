import { useEffect, useState } from "react";
import API from "../api";
import MonthlyChart from "../components/MonthlyChart";
import ExportButtons from "../components/ExportButtons";

export default function Reports() {
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
      <h2>Reports</h2>
      <MonthlyChart expenses={expenses} />
      <ExportButtons expenses={expenses} />
    </div>
  );
}
