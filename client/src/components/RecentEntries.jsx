import React from "react";

export default function RecentEntries({ expenses = [] }) {
    // Helper to format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    // Helper to format date
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const options = { day: "numeric", month: "short", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-IN", options);
    };

    // Get only last 5 entries if not handled by parent
    const recentExpenses = expenses.slice(0, 5);

    const getCategoryColor = (category) => {
        switch (category) {
            case "Food":
                return "badge-food";
            case "Transport":
                return "badge-transport";
            case "Entertainment":
                return "badge-entertainment";
            case "Bills":
                return "badge-bills";
            case "Health":
                return "badge-health";
            case "Education":
                return "badge-education";
            default:
                return "badge-other";
        }
    };

    return (
        <div className="recent-entries-card">
            <div className="card-header">
                <h2 className="card-title">Recent Entries</h2>
            </div>
            <div className="table-container">
                <table className="entries-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th className="amount-cell">Amount</th>
                            <th className="date-cell">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentExpenses.length > 0 ? (
                            recentExpenses.map((expense) => (
                                <tr key={expense._id || expense.id || Math.random()}>
                                    <td>{expense.title}</td>
                                    <td>
                                        <span className={`category-badge ${getCategoryColor(expense.category)}`}>
                                            {expense.category || "Uncategorized"}
                                        </span>
                                    </td>
                                    <td className="amount-cell">
                                        <span className="amount-text">{formatCurrency(expense.amount)}</span>
                                    </td>
                                    <td className="date-cell">
                                        <span className="date-text">{formatDate(expense.date)}</span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="empty-state">
                                    No recent expenses found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
