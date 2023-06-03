import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./Context/AuthContext";
import ProtectedRoute from "./Auth/ProtectedRoute";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import Charts from "./Components/Admin/Charts";
import Login from "./Auth/Login";
import Employee from "./Components/Employee/Employee";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/charts"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Charts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee"
          element={
            <ProtectedRoute roles={["employee"]}>
              <Employee />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
