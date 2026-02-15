import jsPDF from "jspdf";

export default function ExportButtons({ expenses }) {

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Expense Report", 10, 10);

    expenses.forEach((exp, index) => {
      doc.text(
        `${exp.title} - ₹${exp.amount} - ${exp.category}`,
        10,
        20 + index * 10
      );
    });

    doc.save("expenses.pdf");
  };

  return (
    <div>
      <button onClick={exportPDF}>Export PDF</button>
    </div>
  );
}
