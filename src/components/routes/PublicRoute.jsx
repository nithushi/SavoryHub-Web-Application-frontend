import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PublicRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    // If the user is already logged in, redirect them to the home page.
    // 'replace' prevents the user from going back to the login page with the browser's back button.
    return <Navigate to="/" replace />;
  }

  // If the user is not logged in, show the component they were trying to access (e.g., Login or Register).
  // <Outlet /> is a placeholder for the actual page component.
  return <Outlet />;
};

export default PublicRoute;