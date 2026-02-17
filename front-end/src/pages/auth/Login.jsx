import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/auth/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      const { token, role } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role === "patient") navigate("/patient/home");
      else if (role === "doctor") navigate("/doctor/home");
      else if (role === "admin") navigate("/admin/home");

    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h1 className="login-title">BAYMAX</h1>
        <p className="login-subtitle">Your Smart Medical Assistant</p>

        <form onSubmit={handleLogin}>

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

          <button type="submit" className="login-btn">
            Login
          </button>

        </form>

        <p className="register-text">
          Don't have an account? <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
};

export default Login;