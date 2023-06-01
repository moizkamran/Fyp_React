import AdminDashboard from "./Components/Admin/AdminDashboard";
import Charts from "./Components/Admin/Charts";
import Login from "./Auth/Login";
import ProtectedRoute from "./Auth/ProtectedRoute";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./Context/AuthContext";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }

          />
          <Route path="/charts" element={<ProtectedRoute><Charts /></ProtectedRoute>} />

        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
