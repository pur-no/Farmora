import React from "react";

const ExpenseCard = ({ expense, onEdit, onDelete }) => {
  return (
    <div className="expense-card">
      <div className="expense-info">
        <h4>{expense.category}</h4>
        <p>৳{expense.amount}</p>
        <p>{expense.notes}</p>
        <p className="date">{new Date(expense.date).toLocaleDateString()}</p>
      </div>
      <div className="actions">
        <button className="edit-btn" onClick={() => onEdit(expense)}>
          Edit
        </button>
        <button className="delete-btn" onClick={() => onDelete(expense._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExpenseCard;