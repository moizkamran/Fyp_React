import AdminCareerPath from "./Components/Admin/AdminCareerPath";
import AdminPerformance from "./Components/Admin/AdminPerformance";
import AdminReport from "./Components/Admin/AdminReport";
import AdminUser from "./Components/Admin/AdminUser";
import CustomNavbar from "./Components/Navbar/CustomNavbar";
import Employee from "./Components/Employee/Employee";
import EmployeeHistory from "./Components/Employee/EmployeeHistory";
import EmployeePerformance from "./Components/Employee/EmployeePerformance";
import EmployeeReport from "./Components/Employee/EmployeeReport";
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

        <Route element={<ProtectedRoute roles={["admin", "employee"]}><CustomNavbar /></ProtectedRoute>}>
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
            path="/EmployeeReport"
            element={
              <ProtectedRoute roles={["employee"]}>
                <EmployeeReport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/EmployeePerformance"
            element={
              <ProtectedRoute roles={["employee"]}>
                <EmployeePerformance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/EmployeeHistory"
            element={
              <ProtectedRoute roles={["employee"]}>
                <EmployeeHistory />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
