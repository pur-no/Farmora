import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaTachometerAlt, FaMoneyBill, FaBox, FaTasks } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import classNames from "classnames";
import "./Sidebar.css";

const Sidebar = ({ handleLogout, className }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) {
      const isDarkMode = JSON.parse(savedTheme);
      setDarkMode(isDarkMode);
      document.body.classList.toggle("dark-theme", isDarkMode);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); 
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.classList.toggle("dark-theme", darkMode);
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const links = [
    { path: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/admin/expenses", label: "Expenses", icon: <FaMoneyBill /> },
    { path: "/inventory", label: "Inventory", icon: <FaBox /> },
    { path: "/products", label: "Products", icon: <FaBox /> },
    { path: "/tasks", label: "Tasks", icon: <FaTasks /> },
  ];

  return (
    <motion.aside
      animate={{ x: isOpen ? 0 : -300 }} 
      transition={{ type: "spring", stiffness: 100 }}
      className={classNames("sidebar", { "dark-mode": darkMode, open: isOpen }, className)}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="toggle-sidebar-btn"
        aria-label={isOpen ? "Close Sidebar" : "Open Sidebar"}
        aria-expanded={isOpen}
      >
        {isOpen ? "Close" : "Menu"}
      </button>
      <div>
        <h1 className="sidebar-title">Admin Panel</h1>
        {user ? (
          <div className="user-info">
            <img
              src={user.avatar || "https://via.placeholder.com/40"}
              alt={`${user.name}'s Avatar`}
              className="user-avatar"
            />
            <div>
              <p className="user-name">{user.name}</p>
              <p className="user-role">{user.role}</p>
            </div>
          </div>
        ) : userError ? (
          <div className="user-info-placeholder">
            <p>{userError}</p>
          </div>
        ) : (
          <div className="user-info-placeholder">
            {/* <p>Loading user...</p> */}
          </div>
        )}
        <motion.ul
          className="sidebar-links"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {links.map((item) => (
            <li key={item.path} className="sidebar-link-item">
              <Link
                to={item.path}
                aria-current={location.pathname === item.path ? "page" : undefined}
                className={classNames("sidebar-link", {
                  active: location.pathname === item.path,
                })}
              >
                {item.icon} {item.label}
              </Link>
            </li>
          ))}
        </motion.ul>
      </div>
      <div className="sidebar-actions">
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to log out?")) {
              handleLogout();
            }
          }}
          className="logout-btn"
          aria-label="Logout"
        >
          Logout
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;