function Dashboard() {
  const token = localStorage.getItem("token");

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Login successful 🎉</p>

      <p><strong>JWT Token:</strong></p>
      <small>{token}</small>
    </div>
  );
}

export default Dashboard;