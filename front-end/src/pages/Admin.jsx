import { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [pendingDoctors, setPendingDoctors] = useState([]);

  const fetchPendingDoctors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/pending-doctors"
      );
      setPendingDoctors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const approveDoctor = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/approve-doctor/${id}`
      );

      alert("Doctor approved successfully");
      fetchPendingDoctors(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPendingDoctors();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Admin Dashboard</h2>
      <h3>Pending Doctors</h3>

      {pendingDoctors.length === 0 ? (
        <p>No pending doctors</p>
      ) : (
        pendingDoctors.map((doc) => (
          <div
            key={doc._id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px"
            }}
          >
            <p><strong>Name:</strong> {doc.userId?.name}</p>
            <p><strong>Email:</strong> {doc.userId?.email}</p>
            <p><strong>Specialization:</strong> {doc.specialization}</p>
            <p><strong>Hospital:</strong> {doc.hospital}</p>

            <button onClick={() => approveDoctor(doc._id)}>
              Approve
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Admin;