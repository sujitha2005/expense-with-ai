import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseChart({ expenses }) {

  const categoryMap = {};

  expenses.forEach(exp => {
    categoryMap[exp.category] =
      (categoryMap[exp.category] || 0) + exp.amount;
  });

  const data = {
    labels: Object.keys(categoryMap),
    datasets: [
      {
        data: Object.values(categoryMap)
      }
    ]
  };

  return (
    <div style={{ width: "400px" }}>
      <h2>Category Distribution</h2>
      <Pie data={data} />
    </div>
  );
}
