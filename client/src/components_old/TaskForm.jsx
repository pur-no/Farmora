import React, { useState } from "react";

const TaskForm = ({ onSubmit, disabled }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    assignedTo: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.dueDate || !form.assignedTo) {
      alert("Please fill in all required fields.");
      return;
    }
    onSubmit(form);
    setForm({
      title: "",
      description: "",
      dueDate: "",
      assignedTo: "",
      status: "Pending",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h3>Add New Task</h3>
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Due Date:</label>
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Assigned To:</label>
        <input
          type="text"
          name="assignedTo"
          value={form.assignedTo}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" disabled={disabled}>
        {disabled ? "Processing..." : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;