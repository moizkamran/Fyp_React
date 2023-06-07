import AdminDashboard from "./Components/Admin/AdminDashboard";
import AdminPerformance from "./Components/Admin/AdminPerformance";
import Charts from "./Components/Admin/Charts";
import Employee from "./Components/Employee/Employee";
import EmployeeProfileSetting from "./Components/Employee/EmployeeProfileSetting";
import Login from "./Auth/Login";
import ProtectedRoute from "./Auth/ProtectedRoute";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./Context/AuthContext";

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
          path="/adminperformance"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminPerformance />
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
        <Route
          path="/ProfileSetting"
          element={
            <ProtectedRoute roles={["employee"]}>
              <EmployeeProfileSetting />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
