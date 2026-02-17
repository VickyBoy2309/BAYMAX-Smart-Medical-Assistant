import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const DoctorRegister = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    experience: "",
    hospital: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/auth/register", {
        ...form,
        role: "doctor" // 🧸 very important
      });

      alert("Doctor registered. Waiting for admin approval.");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Doctor registration failed");
    }
  };

  return (
    <div>
      <h2>Register as Doctor 🩺</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        /><br />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        /><br />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        /><br />

        <input
          name="specialization"
          placeholder="Specialization"
          value={form.specialization}
          onChange={handleChange}
          required
        /><br />

        <input
          name="experience"
          type="number"
          placeholder="Experience (years)"
          value={form.experience}
          onChange={handleChange}
          required
        /><br />

        <input
          name="hospital"
          placeholder="Hospital Name"
          value={form.hospital}
          onChange={handleChange}
          required
        /><br />

        <button type="submit">Register as Doctor</button>
      </form>

      <p>
        Already registered? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default DoctorRegister;