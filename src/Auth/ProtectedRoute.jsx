import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";
import LoggedInButError from "./LoggedInButError";

const ProtectedRoute = ({ children, roles }) => {
  const { user } = UserAuth();
  const userRole = localStorage.getItem('userRole');
  
  if (user && userRole && roles.includes(userRole)) {
    return children; // Render the protected routes
  } else if (user && userRole === "admin") {
    return <Navigate to="/dashboard" />; // Redirect to admin dashboard if the user is an admin
  } else if (user && userRole === "employee") {
    return <Navigate to="/employee" />; // Redirect to employee page if the user is an employee
  } else if (user) {
    return <LoggedInButError/>; // Redirect to employee page if the user is an employee
  } else {
    return <Navigate to="/" />; // Redirect to login page if the user is not authenticated
  }
};


export default ProtectedRoute;
