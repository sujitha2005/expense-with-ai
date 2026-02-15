import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={{
      width: "200px",
      background: "#f4f4f4",
      height: "100vh",
      padding: "20px"
    }}>
      <h3>Menu</h3>

      <div style={{ marginBottom: "15px" }}>
        <Link to="/">Dashboard</Link>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <Link to="/reports">Reports</Link>
      </div>

      <div>
        <Link to="/settings">Settings</Link>
      </div>
    </div>
  );
}
