import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ExpenseProvider } from "./context/ExpenseContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import ExpenseListPage from "./pages/ExpenseListPage";
import Reports from "./pages/Reports";
import ImportExport from "./pages/ImportExport";
import "./styles/layout.css";

export default function App() {
  return (
    <ExpenseProvider>
      <Router>
        <Navbar />
        <div className="layout">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add" element={<AddExpense />} />
              <Route path="/expenses" element={<ExpenseListPage />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/import-export" element={<ImportExport />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ExpenseProvider>
  );
}

// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { ExpenseProvider } from "./context/ExpenseContext";
// import AppLayout from "./components/AppLayout";
// import Dashboard from "./pages/Dashboard";
// import AddExpense from "./pages/AddExpense";
// import ExpenseListPage from "./pages/ExpenseListPage";
// import Reports from "./pages/Reports";
// import ImportExport from "./pages/ImportExport";
// import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <ExpenseProvider>
//         <Toaster />
//         <Sonner />
//         <BrowserRouter>
//           <Routes>
//             <Route element={<AppLayout />}>
//               <Route path="/" element={<Dashboard />} />
//               <Route path="/add" element={<AddExpense />} />
//               <Route path="/expenses" element={<ExpenseListPage />} />
//               <Route path="/reports" element={<Reports />} />
//               <Route path="/import-export" element={<ImportExport />} />
//             </Route>
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </BrowserRouter>
//       </ExpenseProvider>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;
