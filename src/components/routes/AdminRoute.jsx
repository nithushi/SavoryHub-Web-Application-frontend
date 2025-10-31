import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AdminRoute = () => {
  const { user, isAuthenticated } = useContext(AuthContext);

  // Check if user is authenticated AND has the 'ADMIN' role
  if (isAuthenticated && user?.role === 'ADMIN') {
    return <Outlet />; // If admin, show the requested admin page
  }

  // If not authenticated or not an admin, redirect to the home page
  return <Navigate to="/" replace />;
};

export default AdminRoute;