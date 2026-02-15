import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function MonthlyChart({ expenses }) {

  const monthMap = {};

  expenses.forEach(exp => {
    const month = new Date(exp.date).toLocaleString("default", {
      month: "short",
      year: "numeric"
    });

    monthMap[month] = (monthMap[month] || 0) + exp.amount;
  });

  const data = {
    labels: Object.keys(monthMap),
    datasets: [
      {
        label: "Monthly Expenses",
        data: Object.values(monthMap)
      }
    ]
  };

  return (
    <div style={{ width: "500px" }}>
      <h2>Monthly Report</h2>
      <Bar data={data} />
    </div>
  );
}
