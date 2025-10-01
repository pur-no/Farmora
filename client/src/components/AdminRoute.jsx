// client/src/components/AdminRoute.jsx
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Spinner from './Spinner';

const AdminRoute = () => {
  const { user, isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <Spinner />;
  }

  // Redirect to login if not authenticated, or to home if authenticated but not an admin.
  return isAuthenticated && user.role === 'admin' ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default AdminRoute;