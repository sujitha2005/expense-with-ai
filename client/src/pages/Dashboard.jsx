import { useExpenses } from "../context/ExpenseContext";
import ExpenseChart from "../components/ExpenseChart";
import MonthlyChart from "../components/MonthlyChart";
import { TrendingUp, Calendar, DollarSign, ListTodo } from "lucide-react";
import "../styles/dashboard.css";

const CATEGORY_COLORS = {
  Food: "#16a34a",
  Transport: "#06b6d4",
  Shopping: "#ec4899",
  Bills: "#eab308",
  Entertainment: "#a855f7",
  Health: "#10b981",
  Education: "#f97316",
  Other: "#6b7280"
};

export default function Dashboard() {
  const { expenses } = useExpenses();

  // Calculate stats
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonthExpenses = expenses
    .filter((exp) => {
      const expDate = new Date(exp.date);
      return expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear;
    })
    .reduce((sum, exp) => sum + exp.amount, 0);

  const avgExpense = expenses.length > 0 ? (totalExpenses / expenses.length).toFixed(2) : 0;
  const totalEntries = expenses.length;

  // Get recent expenses (last 12)
  const recentExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 12);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">Your expense overview at a glance</p>
      </div>

      {/* Stat Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <h3>Total Expenses</h3>
            <DollarSign className="stat-icon" size={24} />
          </div>
          <p className="stat-value">₹{totalExpenses.toLocaleString()}</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>This Month</h3>
            <Calendar className="stat-icon" size={24} />
          </div>
          <p className="stat-value">₹{thisMonthExpenses.toLocaleString()}</p>
          <span className="stat-label">Current month</span>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Avg. Expense</h3>
            <TrendingUp className="stat-icon" size={24} />
          </div>
          <p className="stat-value">₹{avgExpense}</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Total Entries</h3>
            <ListTodo className="stat-icon" size={24} />
          </div>
          <p className="stat-value">{totalEntries}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-container">
          <ExpenseChart expenses={expenses} />
        </div>
        <div className="chart-container">
          <MonthlyChart expenses={expenses} />
        </div>
      </div>

      {/* Recent Expenses */}
      <div className="recent-expenses-section">
        <h2 className="section-title">Recent Expenses</h2>
        <div className="table-container">
          <table className="expenses-table">
            <thead>
              <tr>
                <th>TITLE</th>
                <th>CATEGORY</th>
                <th>AMOUNT</th>
                <th>DATE</th>
              </tr>
            </thead>
            <tbody>
              {recentExpenses.map((exp) => (
                <tr key={exp.id}>
                  <td className="title-cell">{exp.title}</td>
                  <td>
                    <span
                      className="category-badge"
                      style={{ backgroundColor: CATEGORY_COLORS[exp.category] || "#6b7280" }}
                    >
                      {exp.category}
                    </span>
                  </td>
                  <td className="amount-cell">₹ {exp.amount.toLocaleString()}</td>
                  <td className="date-cell">
                    {new Date(exp.date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric"
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
