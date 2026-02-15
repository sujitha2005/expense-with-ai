import Papa from "papaparse";
import API from "../api";
import toast from "react-hot-toast";

export default function CSVImport({ refreshExpenses }) {
  const handleFile = (e) => {
    const file = e.target.files[0];

    Papa.parse(file, {
      header: true,
      complete: async function (results) {
        for (let row of results.data) {
          if (row.title && row.amount) {
            await API.post("/expenses", {
              title: row.title,
              amount: Number(row.amount)
            });
          }
        }

        toast.success("CSV Imported!");
        refreshExpenses();
      }
    });
  };

  return (
    <div style={{ marginBottom: "15px" }}>
      <input type="file" accept=".csv" onChange={handleFile} />
    </div>
  );
}
