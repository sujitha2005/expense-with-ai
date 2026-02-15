import { useState, useEffect } from "react";
import API from "../api";
import { Search, Filter } from "lucide-react";
import "../styles/ExpenseList.css";
import "../styles/AddExpense.css"; // Reusing badge styles

export default function ExpenseListPage() {
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Food", "Transport", "Entertainment", "Bills", "Health", "Education", "Other"];

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await API.get("/expenses");
      setExpenses(res.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || expense.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalAmount = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  // Helper reuse from RecentEntries (could be utility but inline for now)
  const getCategoryColor = (category) => {
    switch (category) {
      case "Food": return "badge-food";
      case "Transport": return "badge-transport";
      case "Entertainment": return "badge-entertainment";
      case "Bills": return "badge-bills";
      case "Health": return "badge-health";
      case "Education": return "badge-education";
      default: return "badge-other";
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="expense-list-page">
      <div className="list-header">
        <div>
          <h1 className="page-title">Expense List</h1>
          <p className="expense-meta">
            {filteredExpenses.length} expenses • {formatCurrency(totalAmount)} total
          </p>
        </div>
      </div>

      <div className="controls-section">
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-wrapper">
          <Filter size={18} className="filter-icon" style={{ left: "1rem", zIndex: 1 }} />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
            style={{ paddingLeft: "2.5rem" }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === "All" ? "All Categories" : cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="expense-list-card">
        <div className="list-table-container">
          <table className="expense-list-table">
            <thead>
              <tr>
                <th className="col-title">TITLE</th>
                <th>CATEGORY</th>
                <th className="col-amount">AMOUNT</th>
                <th className="col-date">DATE</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense) => (
                  <tr key={expense._id || expense.id || Math.random()}>
                    <td className="col-title">{expense.title}</td>
                    <td>
                      <span className={`category-badge ${getCategoryColor(expense.category)}`}>
                        {expense.category || "Uncategorized"}
                      </span>
                    </td>
                    <td className="col-amount">{formatCurrency(expense.amount)}</td>
                    <td className="col-date">
                      {new Date(expense.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "3rem", color: "#6b7280" }}>
                    No expenses found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
