import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getExpenses, createExpense, updateExpense, deleteExpense } from "../api/expenseAPI";
import { CATEGORY_OPTIONS } from "../constants/categories";
import Sidebar from "../components/Sidebar";
import ExpenseCard from "../components/ExpenseCard";
import "../styles/ExpensePage.css";

const FilterSection = ({ filter, onFilterChange, onApply, onClear, onSortChange, sort }) => (
  <section className="filter-section" aria-label="Filter and sort expenses">
    <select
      name="category"
      value={filter.category}
      onChange={onFilterChange}
      aria-label="Filter by category"
    >
      <option value="">All Categories</option>
      {CATEGORY_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <input
      type="date"
      name="startDate"
      value={filter.startDate}
      onChange={onFilterChange}
      aria-label="Filter by start date"
      placeholder="Start Date"
    />
    <input
      type="date"
      name="endDate"
      value={filter.endDate}
      onChange={onFilterChange}
      aria-label="Filter by end date"
      placeholder="End Date"
    />
    <select
      name="sort"
      value={sort}
      onChange={onSortChange}
      aria-label="Sort expenses"
    >
      <option value="date-desc">Date (Newest First)</option>
      <option value="date-asc">Date (Oldest First)</option>
      <option value="amount-desc">Amount (High to Low)</option>
      <option value="amount-asc">Amount (Low to High)</option>
      <option value="category-asc">Category (A-Z)</option>
    </select>
    <button className="apply-btn" onClick={onApply}>
      Apply
    </button>
    <button className="clear-btn" onClick={onClear}>
      Clear
    </button>
  </section>
);

const convertToCSV = (data) => {
  const headers = ["Category", "Amount", "Date", "Notes"];
  const escapeCsvField = (field) => {
    if (field == null) return "";
    const str = field.toString();
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };
  const rows = data.map((exp) =>
    [
      escapeCsvField(exp.category),
      escapeCsvField(exp.amount),
      escapeCsvField(new Date(exp.date).toISOString().split("T")[0]),
      escapeCsvField(exp.notes),
    ].join(",")
  );
  return [...headers, ...rows].join("\n");
};

const ExpensePage = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    category: "",
    amount: "",
    notes: "",
    date: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [filter, setFilter] = useState({
    category: "",
    startDate: "",
    endDate: "",
  });
  const [sort, setSort] = useState("date-desc");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate]);

  // Debounce function for filter updates
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  // Clear messages after 3 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const loadExpenses = async () => {
    setLoading(true);
    try {
      const response = await getExpenses(filter);
      const data = Array.isArray(response) ? response : response.data || [];
      const sortedData = sortExpenses(data, sort);
      setExpenses(sortedData);
    } catch (error) {
      setError("Failed to load expenses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedLoadExpenses = debounce(loadExpenses, 500);

  const sortExpenses = (data, sortType) => {
    return [...data].sort((a, b) => {
      switch (sortType) {
        case "date-asc":
          return new Date(a.date) - new Date(b.date);
        case "date-desc":
          return new Date(b.date) - new Date(a.date);
        case "amount-asc":
          return a.amount - b.amount;
        case "amount-desc":
          return b.amount - a.amount;
        case "category-asc":
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!form.category) errors.category = "Category is required";
    if (!form.amount || form.amount <= 0) errors.amount = "Valid amount is required";
    if (!form.date) errors.date = "Date is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    const errors = { ...formErrors };
    if (name === "category" && value) delete errors.category;
    if (name === "amount" && value > 0) delete errors.amount;
    if (name === "date" && value) delete errors.date;
    setFormErrors(errors);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
    debouncedLoadExpenses();
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    loadExpenses();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      if (isEditing) {
        await updateExpense(editId, form);
        setSuccess("Expense updated successfully.");
      } else {
        await createExpense(form);
        setSuccess("Expense added successfully.");
      }
      resetForm();
      loadExpenses();
    } catch (error) {
      setError("Failed to save expense. Please try again.");
    }
  };

  const handleEdit = (expense) => {
    setForm({
      category: expense.category,
      amount: expense.amount,
      notes: expense.notes,
      date: expense.date.split("T")[0],
    });
    setIsEditing(true);
    setEditId(expense._id);
    setFormErrors({});
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    try {
      await deleteExpense(id);
      setSuccess("Expense deleted successfully.");
      loadExpenses();
    } catch (error) {
      setError("Failed to delete expense. Please try again.");
    }
  };

  const resetForm = () => {
    setForm({ category: "", amount: "", notes: "", date: "" });
    setIsEditing(false);
    setEditId(null);
    setFormErrors({});
  };

  const clearFilters = () => {
    setFilter({ category: "", startDate: "", endDate: "" });
    setSort("date-desc");
    loadExpenses();
  };

  const calculateTotal = () => {
    return expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0).toFixed(2);
  };

  const handleExportCSV = () => {
    if (expenses.length === 0) {
      setError("No expenses to export.");
      return;
    }
    if (!window.confirm("Do you want to export the expenses to CSV?")) return;

    const csv = convertToCSV(expenses);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    link.download = `expenses_${timestamp}.csv`;
    link.click();
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <div className="min-h-screen">
      <Sidebar handleLogout={handleLogout} />
      <div className="main-content">
        <div className="expense-page">
          <h2 className="page-title">Expense Tracker</h2>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <FilterSection
            filter={filter}
            onFilterChange={handleFilterChange}
            onApply={loadExpenses}
            onClear={clearFilters}
            onSortChange={handleSortChange}
            sort={sort}
          />

          <div className="export-section">
            <button className="export-btn" onClick={handleExportCSV}>
              Export to CSV
            </button>
            <div className="total-expenses" aria-label="Total expenses">
              Total: ৳{calculateTotal()}
            </div>
          </div>

          <h3 className="form-title">Add Expense</h3>
          <form className="expense-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                aria-label="Select category"
                aria-invalid={!!formErrors.category}
              >
                <option value="" disabled>
                  Select Category
                </option>
                {CATEGORY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {formErrors.category && (
                <span className="error-text">{formErrors.category}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input
                id="amount"
                type="number"
                name="amount"
                placeholder="Enter amount (e.g., 100.00)"
                value={form.amount}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                aria-label="Enter amount"
                aria-invalid={!!formErrors.amount}
              />
              {formErrors.amount && (
                <span className="error-text">{formErrors.amount}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                id="date"
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                aria-label="Select date"
                aria-invalid={!!formErrors.date}
              />
              {formErrors.date && (
                <span className="error-text">{formErrors.date}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="notes">Notes (Optional)</label>
              <textarea
                id="notes"
                name="notes"
                placeholder="Add notes (optional)"
                value={form.notes}
                onChange={handleChange}
                aria-label="Add notes"
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : isEditing ? "Update Expense" : "Add Expense"}
            </button>
          </form>

          {loading ? (
            <div className="loading-spinner" aria-label="Loading">
              Loading expenses...
            </div>
          ) : (
            <div className="expense-list">
              {expenses.length > 0 ? (
                expenses.map((expense) => (
                  <ExpenseCard
                    key={expense._id}
                    expense={expense}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))
              ) : (
                <div className="empty-state">
                  <p>No expenses found.</p>
                  <p className="empty-state-cta">Add your first expense above!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpensePage;