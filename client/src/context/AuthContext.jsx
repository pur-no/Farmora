// client/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast'; // Import toast

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
        setIsAuthenticated(true);
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setToken(res.data.token);
        setUser(res.data.user);
        setIsAuthenticated(true);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        toast.success(`Welcome back, ${res.data.user.name}!`); // Success toast
      }
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      toast.error(message); // Error toast
      return { success: false, message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', {
        name,
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setToken(res.data.token);
        setUser(res.data.user);
        setIsAuthenticated(true);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        toast.success(`Welcome, ${res.data.user.name}! Account created.`); // Success toast
      }
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      toast.error(message); // Error toast
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    delete axios.defaults.headers.common['Authorization'];
    toast.success('You have been logged out.'); // Logout toast
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;