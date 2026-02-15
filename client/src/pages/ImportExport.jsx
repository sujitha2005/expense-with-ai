import React, { useState, useEffect } from "react";
import CSVImport from "../components/CSVImport";
import ExportButtons from "../components/ExportButtons";
import CategoryChart from "../components/CategoryChart";
import CategoryBreakdown from "../components/CategoryBreakdown";
import RecentEntries from "../components/RecentEntries";
import API from "../api";
import "../styles/ImportExport.css";
import "../styles/Reports.css"; // Reuse report styles for grid

export default function ImportExport() {
  const [expenses, setExpenses] = useState([]);
  const [isImportView, setIsImportView] = useState(false);

  const fetchExpenses = async () => {
    try {
      const res = await API.get("/expenses");
      setExpenses(res.data);
      setIsImportView(false);
    } catch (error) {
      console.error("Error fetching expenses for export:", error);
    }
  };

  const handleImportSuccess = (importedData) => {
    setExpenses(importedData);
    setIsImportView(true);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="import-export-page">
      <div className="page-header">
        <h1 className="page-title">Import & Export</h1>
        <p className="page-subtitle">Manage your expense data</p>
      </div>

      <div className="function-card">
        <h2 className="card-title">
          Import CSV
        </h2>
        <p className="card-description">
          Upload a CSV file with columns: <span className="code-snippet">title, amount, date, category</span>
        </p>
        <CSVImport refreshExpenses={handleImportSuccess} />
      </div>

      <div className="function-card">
        <h2 className="card-title">
          Export Data
        </h2>
        <p className="card-description">
          Download your expenses as CSV or PDF
        </p>
        <ExportButtons expenses={expenses} />
      </div>

      {expenses.length > 0 && (
        <div style={{ marginTop: "3rem", borderTop: "1px solid #e5e7eb", paddingTop: "2rem" }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "1.5rem" }}>
            <h2 className="card-title" style={{ margin: 0 }}>
              {isImportView ? "Imported Data Overview" : "Expense Overview"}
            </h2>
            {isImportView && (
              <button
                onClick={fetchExpenses}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  color: '#4b5563',
                  background: '#f3f4f6',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Show All Expenses
              </button>
            )}
          </div>

          <div className="reports-grid">
            <CategoryChart expenses={expenses} />
            <CategoryBreakdown expenses={expenses} />
          </div>
          <div style={{ marginTop: "2rem" }}>
            <RecentEntries expenses={expenses} title="All Expenses" limit={null} />
          </div>
        </div>
      )}
    </div>
  );
}
