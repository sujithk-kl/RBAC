import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Check if the user is authenticated
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles are specified, ensure the user's role matches one of them
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    alert("Access Denied: Insufficient permissions.");
    return <Navigate to="/dashboard" replace />;
  }

  // Render the protected component if authentication and role checks pass
  return children;
};

export default ProtectedRoute;
