import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PrivateRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    // If user is not logged in, redirect them to the login page
    return <Navigate to="/login" replace />;
  }

  // If logged in, show the page they requested (e.g., Home, Profile)
  return <Outlet />;
};

export default PrivateRoute;