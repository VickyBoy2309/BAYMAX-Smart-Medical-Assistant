import React from "react";

const DoctorRequests = () => {
  return (
    <div style={{ padding: "30px" }}>
      <h2>Doctor Requests 🩺</h2>

      <div style={{ marginTop: "20px" }}>
        <p><b>Name:</b> Dr. Sample</p>
        <p><b>Specialization:</b> Cardiologist</p>
        <p>Status: Pending</p>

        <button>Approve</button>
        <button style={{ marginLeft: "10px" }}>Reject</button>
      </div>
    </div>
  );
};

export default DoctorRequests;