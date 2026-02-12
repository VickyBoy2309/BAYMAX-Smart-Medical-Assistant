import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleProtectedClick = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div>
      <h1>BAYMAX</h1>
      <p>Your Personal AI Care Taker</p>

      <button onClick={handleProtectedClick}>
        Book Appointment
      </button>

      <button onClick={handleProtectedClick}>
        Buy Medicines
      </button>

      <button onClick={handleProtectedClick}>
        View Health Records
      </button>
    </div>
  );
};

export default Home;