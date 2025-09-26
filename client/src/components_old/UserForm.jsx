import React, { useState } from "react";
import { updateUser } from "../api/userAPI";

const UserForm = ({ user, onSave }) => {
  const [formData, setFormData] = useState(user || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(formData._id, formData);
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{user ? "Edit User" : "Add User"}</h2>
      <input
        type="text"
        name="name"
        value={formData.name || ""}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={formData.email || ""}
        onChange={handleChange}
        placeholder="Email"
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default UserForm;