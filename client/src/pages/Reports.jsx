import { useEffect, useState } from "react";
import API from "../api";
import MonthlyChart from "../components/MonthlyChart";
import CategoryChart from "../components/CategoryChart";
import CategoryBreakdown from "../components/CategoryBreakdown";
import ExportButtons from "../components/ExportButtons";
import "../styles/Reports.css";

export default function Reports() {
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
    <div className="reports-page">
      <div className="reports-header">
        <h1 className="page-title">Reports</h1>
        <p className="page-subtitle">Visual breakdown of your spending</p>
      </div>

      <div className="reports-grid">
        <CategoryChart expenses={expenses} />

        <div className="reports-card">
          <h3 className="section-title">Monthly Report</h3>
          <div className="chart-container">
            <MonthlyChart expenses={expenses} />
          </div>
        </div>
      </div>

      <CategoryBreakdown expenses={expenses} />

      <div style={{ marginTop: "2rem" }}>
        <ExportButtons expenses={expenses} />
      </div>
    </div>
  );
}
