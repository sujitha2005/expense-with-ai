import { useEffect, useState } from "react";
import API from "../api";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseChart";
import CSVImport from "../pages/CSVImport";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const fetchExpenses = async () => {
    const res = await API.get("/expenses");
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const filteredExpenses = expenses.filter((exp) => {
    const matchesSearch = exp.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" ||
      exp.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentExpenses = filteredExpenses.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);

  const totalExpense = filteredExpenses.reduce(
    (acc, exp) => acc + exp.amount,
    0
  );

  return (
    <div>
      <h2 className="dashboard-title">Dashboard Overview</h2>

      <div className="filter-bar">
        <input
          placeholder="Search expense..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Rent">Rent</option>
          <option value="Shopping">Shopping</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="summary-card">
        <h4>Total Expenses</h4>
        <p>₹ {totalExpense}</p>
      </div>

      <ExpenseForm fetchExpenses={fetchExpenses} />
      <CSVImport refreshExpenses={fetchExpenses} />
      <ExpenseChart expenses={filteredExpenses} />

      <ExpenseList
        expenses={currentExpenses}
        refreshExpenses={fetchExpenses}
      />

      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? "active-page" : ""}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
