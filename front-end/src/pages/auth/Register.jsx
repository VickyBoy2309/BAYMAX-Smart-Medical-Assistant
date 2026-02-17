import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/auth/Register.css";

const Register = () => {
  const [role, setRole] = useState("patient");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password, role }
      );

      alert(res.data.message || "Registered successfully");
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">

        <h1 className="register-title">Create Account</h1>
        <p className="register-subtitle">
          Join BAYMAX – Your Smart Medical Assistant
        </p>

        <form onSubmit={handleRegister}>

          {/* ROLE CARDS */}
          <div className="role-selection">
            <div
              className={`role-card ${role === "patient" ? "active" : ""}`}
              onClick={() => setRole("patient")}
            >
              <h3>Patient</h3>
              <p>Book doctors, buy medicines & manage health</p>
            </div>

            <div
              className={`role-card ${role === "doctor" ? "active" : ""}`}
              onClick={() => setRole("doctor")}
            >
              <h3>Doctor</h3>
              <p>Manage appointments & consult patients</p>
            </div>
          </div>

          <div className="input-group">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="register-btn">
            Register
          </button>

        </form>

        <p className="login-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
};

export default Register;