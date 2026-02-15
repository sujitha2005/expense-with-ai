export default function ExpenseList({ expenses }) {
  return (
    <div>
      <h2>Expense List</h2>
      <ul>
        {expenses.map((exp) => (
          <li key={exp._id}>
            {exp.title} — ₹{exp.amount} — {exp.category}
          </li>
        ))}
      </ul>
    </div>
  );
}
