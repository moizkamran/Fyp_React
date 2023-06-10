import AdminCareerPath from "./Components/Admin/AdminCareerPath";
import AdminLogin from "./Auth/AdminLogin";
import AdminPerformance from "./Components/Admin/AdminPerformance";
import AdminReport from "./Components/Admin/AdminReport";
import AdminUser from "./Components/Admin/AdminUser";
import CustomNavbar from "./Components/Navbar/CustomNavbar";
import EmpNavbar from "./Components/Navbar/EmpNavbar";
import Employee from "./Components/Employee/Employee";
import EmployeeHistory from "./Components/Employee/EmployeeHistory";
import EmployeePerformance from "./Components/Employee/EmployeePerformance";
import EmployeeProfile from "./Components/Employee/EmployeeProfile.";
import EmployeeProfileSetting from "./Components/Employee/EmployeeProfileSetting";
import ForgotPassword from "./Auth/ForgotPassword";
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
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/EmployeeProfile" element={<EmployeeProfile />} />


        <Route path="/login" element={<Login />} />
        <Route path="/Admin_Login" element={<AdminLogin />} />

        <Route element={<ProtectedRoute roles={["admin",]}><CustomNavbar /></ProtectedRoute>}>
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
        </Route>

        <Route element={<ProtectedRoute roles={["employee",]}><EmpNavbar /></ProtectedRoute>}>
          <Route
            path="/EmployeeProfile"
            element={
              <ProtectedRoute roles={["employee"]}>
                <EmployeeProfile />
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
            path="/EmployeeProfileSetting"
            element={
              <ProtectedRoute roles={["employee"]}>
                <EmployeeProfileSetting />
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
