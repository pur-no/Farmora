import React, { useState } from "react";

const TaskCard = ({ task, onComplete, onDelete, disabled }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!task || !task._id || !task.status || !task.dueDate || !task.title) {
    console.warn("Invalid task prop:", task);
    return null; 
  }

  const isOverdue = task.status !== "Completed" && new Date(task.dueDate) < new Date();

  const handleComplete = async () => {
    setIsProcessing(true);
    try {
      await onComplete();
    } catch (error) {
      console.error("Failed to complete task:", error);
    }
    setIsProcessing(false);
  };

  const handleDelete = async () => {
    setIsProcessing(true);
    try {
      await onDelete();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
    setIsProcessing(false);
  };

  return (
    <div className={`task-card ${isOverdue ? "overdue" : ""}`}>
      <div className="task-info">
        <h4>{task.title}</h4>
        <p>{task.description || "No description"}</p>
        <p>
          👤 {task.assignedTo} | 📅 {new Date(task.dueDate).toLocaleDateString()}
        </p>
        <span className={`status ${task.status.toLowerCase()}`}>
          {task.status} {isOverdue && <span className="overdue">⚠️ Overdue</span>}
        </span>
      </div>
      <div className="task-actions">
        {task.status !== "Completed" && (
          <button
            onClick={handleComplete}
            disabled={isProcessing || disabled}
            className="complete"
          >
            {isProcessing ? "Processing..." : "Complete"}
          </button>
        )}
        <button
          onClick={handleDelete}
          disabled={isProcessing || disabled}
          className="delete"
        >
          {isProcessing ? "Processing..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default TaskCard;