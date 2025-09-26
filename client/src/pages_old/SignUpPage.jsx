import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/SignUpPage.css";

const SignUpPage = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phoneNumber: '', 
    password: '',
    confirmPassword: '',
    address: '',
    type: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/signup', userData);

      localStorage.setItem("userInfo", JSON.stringify(data)); 
      alert("Account created successfully!");
      navigate('/login'); 
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input type="text" name="name" value={userData.name} onChange={handleChange} placeholder="Name" required />
        <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" required />
        <input type="text" name="phoneNumber" value={userData.phoneNumber} onChange={handleChange} placeholder="Phone Number" required />
        <input type="text" name="address" value={userData.address} onChange={handleChange} placeholder="Address" required />
        <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Password" required />
        <input type="password" name="confirmPassword" value={userData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
        <select name="type" value={userData.type} onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" disabled={loading}>{loading ? "Signing Up..." : "Sign Up"}</button>
      </form>
    </div>
  );
};

export default SignUpPage;
