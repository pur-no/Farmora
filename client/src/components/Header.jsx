// client/src/components/Header.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { isAuthenticated, user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const authLinks = (
    <>
      <span className="welcome-user">Welcome, {user?.name}</span>
      <li>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </>
  );

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Farmora</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
        </ul>
      </nav>
    </header>
  );
};

export default Header;