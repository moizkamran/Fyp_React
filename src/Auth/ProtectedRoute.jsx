import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";

const ProtectedRoute = ({ children, roles }) => {
  const { user } = UserAuth();

  if (user && roles.includes(user.role)) {
    return children; // Render the protected routes
  } else if (user && user.role === "admin") {
    return <Navigate to="/dashboard" />; // Redirect to admin dashboard if the user is an admin
  } else if (user && user.role === "employee") {
    return <Navigate to="/employee" />; // Redirect to employee page if the user is an employee
  } else {
    return <Navigate to="/" />; // Redirect to login page if the user is not authenticated
  }
};

export default ProtectedRoute;
