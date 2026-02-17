import React from "react";
import "../../styles/Doctor/DoctorHome.css";

const DoctorHome = () => {
  return (
    <div className="doctor-layout">

      {/* Sidebar */}
      <div className="doctor-sidebar">
        <h2 className="logo">BAYMAX</h2>
        <ul>
          <li className="active">Dashboard</li>
          <li>My Appointments</li>
          <li>Patients</li>
          <li>Video Consultation</li>
          <li>Reports</li>
          <li>Settings</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="doctor-main">

        <div className="doctor-topbar">
          <h2>Welcome Doctor 👋</h2>
          <button className="logout-btn">Logout</button>
        </div>

        <div className="doctor-stats">
          <div className="stat-card">
            <h4>Today's Appointments</h4>
            <h2>12</h2>
          </div>

          <div className="stat-card">
            <h4>Waiting Patients</h4>
            <h2>5</h2>
          </div>

          <div className="stat-card">
            <h4>Completed Today</h4>
            <h2>8</h2>
          </div>

          <div className="stat-card">
            <h4>Upcoming Consultations</h4>
            <h2>4</h2>
          </div>
        </div>

        <div className="appointments-section">
          <h3>Today's Schedule</h3>

          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Time</th>
                <th>Issue</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>John Doe</td>
                <td>10:00 AM</td>
                <td>Fever</td>
                <td>Waiting</td>
                <td><button className="start-btn">Start</button></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default DoctorHome;