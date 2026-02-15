import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  List,
  BarChart3,
  ArrowUpDown,
  IndianRupee,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import "../styles/sidebar.css";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/add", label: "Add Expense", icon: PlusCircle },
  { to: "/expenses", label: "Expense List", icon: List },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/import-export", label: "Import / Export", icon: ArrowUpDown }
];

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="mobile-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`sidebar-container ${
          mobileOpen ? "sidebar-open" : ""
        }`}
      >
        {/* Logo Section */}
        <div className="sidebar-header">
          <div className="logo-box">
            <IndianRupee size={20} />
          </div>
          <div>
            <h1 className="logo-title">ExpenseIQ</h1>
            <p className="logo-subtitle">Smart Tracker</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "nav-item active-nav"
                  : "nav-item"
              }
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer Card */}
        <div className="sidebar-footer">
          <p className="footer-label">Total This Month</p>
          <p className="footer-amount">₹ --</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
