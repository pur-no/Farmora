import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";
import DashboardChart from "../components/DashboardChart";
import Sidebar from "../components/Sidebar";
import ClipLoader from "react-spinners/ClipLoader";
import "../styles/AdminDashboard.css";
import { Package, AlertTriangle, ClipboardList, User } from "lucide-react";
import { getExpenses } from "../api/expenseAPI";

// Error Boundary
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-message">
          <p>Error: {this.state.error?.message || "Something went wrong"}</p>
          <button onClick={() => window.location.reload()}>Refresh</button>
        </div>
      );
    }
    return this.props.children;
  }
}

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Fetch dashboard and expense data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch dashboard stats
        const statsResponse = await fetch("http://localhost:5000/api/dashboard");
        if (!statsResponse.ok) {
          throw new Error("Failed to fetch dashboard data");
        }
        const statsData = await statsResponse.json();
        setStats(statsData);

        // Fetch expenses
        const expenses = await getExpenses();
        // Aggregate expenses by category
        const aggregatedData = expenses.reduce((acc, expense) => {
          const category = expense.category;
          const amount = parseFloat(expense.amount || 0);
          const existing = acc.find((item) => item._id === category);
          if (existing) {
            existing.total += amount;
          } else {
            acc.push({ _id: category, total: amount });
          }
          return acc;
        }, []);
        setExpenseData(aggregatedData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  // Handle export
  const handleExport = () => {
    if (!stats) {
      setError("No data available to export.");
      return;
    }
    const csv = convertToCSV(stats);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    link.download = `dashboard_stats_${timestamp}.csv`;
    link.click();
  };

  // Define cards based on real data
  const filteredCards = [
    stats?.totalProducts !== undefined && {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
    },
    stats?.lowInventoryCount !== undefined && {
      title: "Low Inventory",
      value: stats.lowInventoryCount,
      icon: AlertTriangle,
      alertLevel: stats.lowInventoryCount > 5 ? "high" : stats.lowInventoryCount > 0 ? "medium" : "",
    },
    stats?.pendingTasks !== undefined && {
      title: "Pending Tasks",
      value: stats.pendingTasks,
      icon: ClipboardList,
    },
    stats?.recentActivities?.length > 0 && {
      title: "Recent Activities",
      value: stats.recentActivities.length,
      icon: ClipboardList,
    },
    stats?.totalUsers !== undefined && {
      title: "Total Users",
      value: stats.totalUsers,
      icon: User,
    },
  ]
    .filter(Boolean)
    .filter((card) => card.title.toLowerCase().includes(searchQuery));

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        <Sidebar handleLogout={handleLogout} />
        <main>
          <div className="welcome-section">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Welcome back, Admin!</h2>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <p>{error}</p>
              <button
                onClick={() => {
                  setLoading(true);
                  setError(null);
                  fetch("http://localhost:5000/api/dashboard")
                    .then((response) => {
                      if (!response.ok) throw new Error("Failed to fetch");
                      return response.json();
                    })
                    .then((data) => setStats(data))
                    .catch((err) => setError(`Failed to fetch: ${err.message}`))
                    .finally(() => setLoading(false));
                }}
                className="btn-retry"
              >
                Retry
              </button>
            </div>
          )}

          {/* Loading Spinner */}
          {loading ? (
            <div className="skeleton-loader">
              <div className="skeleton-card"></div>
              <div className="skeleton-card"></div>
              <div className="skeleton-card"></div>
              <div className="skeleton-card"></div>
            </div>
          ) : !stats || filteredCards.length === 0 ? (
            <p className="text-red-500">No dashboard data available. Please try again later.</p>
          ) : (
            <>
              {/* Dashboard Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <DashboardCard
                  title="Pending Tasks"
                  value={stats.pendingTasks}
                  icon={ClipboardList}
                  alertLevel=""
                  onClick={() => handleCardClick("/tasks")}
                />
                <DashboardCard
                  title="Low Inventory"
                  value={stats.lowInventoryCount}
                  icon={AlertTriangle}
                  alertLevel={stats.lowInventoryCount > 5 ? "high" : "medium"}
                  onClick={() => handleCardClick("/inventory")}
                />
                <DashboardCard
                  title="Total Products"
                  value={stats.totalProducts}
                  icon={Package}
                  alertLevel=""
                  onClick={() => handleCardClick("/products")}
                />
                <DashboardCard
                  title="Total Users"
                  value={stats.totalUsers}
                  icon={User}
                  alertLevel=""
                  onClick={() => handleCardClick("/manage-users")}
                />
              </div>

              {/* Quick Actions */}
              <div className="quick-actions">
                <button onClick={() => navigate("/manage-users")} className="btn-secondary">
                  Manage Users
                </button>
                <button onClick={handleExport} className="btn-export" aria-label="Export Data">
                  Export Data
                </button>
              </div>

              {/* Notifications */}
              <div className="notifications"></div>

              {/* Dashboard Chart */}
              <DashboardChart data={expenseData} />
            </>
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
};

// Convert stats to CSV
const convertToCSV = (stats) => {
  const headers = ["Metric", "Value"];
  const rows = [];
  if (stats.totalProducts !== undefined) rows.push(["Total Products", stats.totalProducts]);
  if (stats.lowInventoryCount !== undefined) rows.push(["Low Inventory", stats.lowInventoryCount]);
  if (stats.pendingTasks !== undefined) rows.push(["Pending Tasks", stats.pendingTasks]);
  if (stats.recentActivities?.length > 0) rows.push(["Recent Activities", stats.recentActivities.length]);
  if (stats.totalUsers !== undefined) rows.push(["Total Users", stats.totalUsers]);
  return [headers.join(","), ...rows.map((row) => row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(","))].join("\n");
};

export default AdminDashboard;