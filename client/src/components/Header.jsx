// client/src/components/Header.jsx
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  const NavLink = ({ to, children }) => (
    <li>
      <Link
        to={to}
        onClick={() => setIsMenuOpen(false)}
        className="block py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0"
      >
        {children}
      </Link>
    </li>
  );

  const adminLinks = user?.role === 'admin' && (
    <div className="relative group">
       <button className="py-2 px-3 text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0 flex items-center">
         Admin Menu <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/></svg>
       </button>
       <div className="absolute z-10 hidden group-hover:block bg-white rounded-lg shadow w-44">
           <ul className="py-2 text-sm text-gray-700">
               <li><Link to="/admin/users" className="block px-4 py-2 hover:bg-gray-100">Manage Users</Link></li>
               <li><Link to="/admin/products" className="block px-4 py-2 hover:bg-gray-100">Manage Products</Link></li>
           </ul>
       </div>
    </div>
  );

  const authLinks = (
    <>
      {adminLinks}
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/weather">Weather</NavLink>
      <li className="hidden md:block text-gray-400">|</li>
      <li className="mt-2 md:mt-0">
        <div className="flex items-center gap-2">
           <Link to="/profile" className="flex items-center gap-2 text-white hover:text-blue-500" onClick={() => setIsMenuOpen(false)}>
            <span className="font-semibold">Welcome, {user?.name}</span>
           </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left md:w-auto py-2 px-3 text-white bg-red-600 hover:bg-red-700 rounded md:rounded-md"
          >
            Logout
          </button>
        </div>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
    </>
  );

  return (
    <nav className="bg-gray-800 border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Farmora
          </span>
        </Link>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 bg-gray-800 md:bg-gray-800 border-gray-700 items-center">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Products</NavLink>
            {!loading && (isAuthenticated ? authLinks : guestLinks)}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;