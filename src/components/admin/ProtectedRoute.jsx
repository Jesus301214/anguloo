import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Auth disabled — redirect to login placeholder
  return <Navigate to="/login-admin" replace />;
};

export default ProtectedRoute;
