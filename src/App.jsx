import AdminCareerPath from "./Components/Admin/AdminCareerPath";
import AdminPerformance from "./Components/Admin/AdminPerformance";
import AdminReport from "./Components/Admin/AdminReport";
import AdminUser from "./Components/Admin/AdminUser";
import Charts from "./Components/Admin/Charts";
import Employee from "./Components/Employee/Employee";
import EmployeeProfileSetting from "./Components/Employee/EmployeeProfileSetting";
import Login from "./Auth/Login";
import MainPage from "./Components/Dashboard/MainPage";
import ProtectedRoute from "./Auth/ProtectedRoute";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./Context/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route
          path="/"
          element={

            <MainPage />

          }
        />
        <Route path="/login" element={<Login />} />

        <Route
          path="/AdminUser"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/AdminCareerPath"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminCareerPath />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AdminReport"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminReport />
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
          path="/AdminPerformance"
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
