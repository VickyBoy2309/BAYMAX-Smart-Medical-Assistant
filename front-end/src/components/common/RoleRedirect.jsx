import React from "react";
import { Navigate } from "react-router-dom";
import PatientHome from "../../pages/patient/PatientHome";

const RoleRedirect = () => {
  const role = localStorage.getItem("role");

  if (!role) {
    return <PatientHome />; // default public page
  }

  if (role === "patient") {
    return <Navigate to="/patient/home" />;
  }

  if (role === "doctor") {
    return <Navigate to="/doctor/home" />;
  }

  if (role === "admin") {
    return <Navigate to="/admin/home" />;
  }

  return <PatientHome />;
};

export default RoleRedirect;