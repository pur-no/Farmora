import React, { useEffect, useState, useMemo } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import debounce from "lodash.debounce";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import { fetchTasks, createTask, updateTask, deleteTask } from "../api/taskAPI";
import { Spinner } from "../components/Spinner"; // Create a reusable spinner component

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

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("dueDate");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const debouncedSearch = useMemo(
    () => debounce((value) => {
      setSearchQuery(value);
      setCurrentPage(1);
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(data);
      setError("");
    } catch (err) {
      const message = err.message || "Failed to load tasks. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
    return () => {
      debouncedSearch.cancel();
    };
  }, []);

  const handleAddTask = async (form) => {
    try {
      setActionLoading(true);
      await createTask(form);
      toast.success("Task added successfully!");
      loadTasks();
    } catch {
      toast.error("Failed to add task.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleComplete = async (taskId) => {
    try {
      setActionLoading(true);
      const task = tasks.find((t) => t._id === taskId);
      if (!task) throw new Error("Task not found");
      await updateTask(taskId, { ...task, status: "Completed" });
      toast.success("Task marked as completed!");
      loadTasks();
    } catch {
      toast.error("Failed to complete task.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        setActionLoading(true);
        await deleteTask(taskId);
        toast.success("Task deleted successfully!");
        loadTasks();
      } catch {
        toast.error("Failed to delete task.");
      } finally {
        setActionLoading(false);
      }
    }
  };

  const filteredTasks = useMemo(() => {
    const result = tasks.filter(
      (t) =>
        t &&
        (filter === "All" ? true : t.status === filter) &&
        (t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (t.description || "").toLowerCase().includes(searchQuery.toLowerCase()))
    );
    result.sort((a, b) => {
      let valueA, valueB;
      if (sortBy === "dueDate") {
        valueA = new Date(a.dueDate).getTime();
        valueB = new Date(b.dueDate).getTime();
      } else if (sortBy === "title") {
        valueA = a.title.toLowerCase();
        valueB = b.title.toLowerCase();
      } else if (sortBy === "status") {
        valueA = a.status;
        valueB = b.status;
      }
      if (sortOrder === "asc") {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
    return result;
  }, [tasks, filter, searchQuery, sortBy, sortOrder]);

  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * tasksPerPage;
    return filteredTasks.slice(startIndex, startIndex + tasksPerPage).filter((task) => task);
  }, [filteredTasks, currentPage]);

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  return (
    <div className="app-container">
      <Sidebar handleLogout={handleLogout} />
      <main className="main-content">
        <div className="content-container">
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <h2>Task Management</h2>

          <div className="filters">
            <div className="filter-group">
              <label>Filter:</label>
              <select
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Search:</label>
              <input
                type="text"
                placeholder="Search tasks..."
                onChange={handleSearchChange}
              />
            </div>

            <div className="filter-group">
              <label>Sort By:</label>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="dueDate">Due Date</option>
                <option value="title">Title</option>
                <option value="status">Status</option>
              </select>
              <select
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>

          <p className="task-count">
            Showing {paginatedTasks.length} of {filteredTasks.length} tasks (Total: {tasks.length})
          </p>

          <TaskForm onSubmit={handleAddTask} disabled={actionLoading} />

          {error && (
            <div className="error-message">
              <p>{error}</p>
              <button onClick={() => setError("")}>Dismiss</button>
            </div>
          )}

          {loading ? (
            <Spinner />
          ) : paginatedTasks.length === 0 ? (
            <p>No tasks to display. Add one above!</p>
          ) : (
            <div className="task-list">
              <ErrorBoundary>
                {paginatedTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onComplete={() => handleComplete(task._id)}
                    onDelete={() => handleDelete(task._id)}
                    disabled={actionLoading}
                  />
                ))}
              </ErrorBoundary>
            </div>
          )}

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || actionLoading}
              >
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || actionLoading}
              >
                Next
              </button>
              <select
                value={currentPage}
                onChange={(e) => handlePageChange(Number(e.target.value))}
                disabled={actionLoading}
              >
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <option key={page} value={page}>
                    Page {page}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TaskPage;