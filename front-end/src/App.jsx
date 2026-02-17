// React imports
import { Routes, Route } from "react-router-dom";
//Auth imports
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
//Patient imports
import PatientHome from "./pages/patient/PatientHome";
//Doctor imports
import DoctorHome from "./pages/doctor/DoctorDashboard";
//Admin imports
import AdminDashboard from "./pages/admin/AdminDashboard";
//Routes & Role
import ProtectedRoute from "./components/common/ProtectedRoute";
import RoleRedirect from "./components/common/RoleRedirect";

function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<RoleRedirect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* PROTECTED */}
      <Route
        path="/patient/home"
        element={
          <ProtectedRoute role="patient">
            <PatientHome />
          </ProtectedRoute>
        }
      />

      <Route
        path="/doctor/home"
        element={
          <ProtectedRoute role="doctor">
            <DoctorHome />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/home"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
