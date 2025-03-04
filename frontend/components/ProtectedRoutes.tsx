import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom'; // Add useLocation
import { AuthContext } from './AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation(); // Get the current location

  // If the user is not authenticated, redirect to the login page with the current location as state
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;