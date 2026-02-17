import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Stethoscope,
  Pill,
  FlaskConical,
  FileText,
  Shield,
  MapPin,
  Search,
  Users,
  Clock,
  MessageSquare,
  PhoneCall,
  AlertCircle,
} from "lucide-react";

import "../../styles/Patient/PatientHome.css";
import Footer from "../../components/common/Footer";

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Cardiologist",
    hospital: "City Heart Hospital",
    experience: "15 years",
    waiting: 3,
    image:
      "https://images.unsplash.com/photo-1676552055618-22ec8cde399a?w=1080",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialization: "Neurologist",
    hospital: "Metro General Hospital",
    experience: "12 years",
    waiting: 5,
    image:
      "https://images.unsplash.com/photo-1755189118414-14c8dacdb082?w=1080",
  },
  {
    id: 3,
    name: "Dr. Priya Sharma",
    specialization: "Pediatrician",
    hospital: "Rainbow Children Hospital",
    experience: "10 years",
    waiting: 2,
    image:
      "https://images.unsplash.com/photo-1739298061768-41a8a7d8b38f?w=1080",
  },
];

const pharmacies = [
  {
    id: 1,
    name: "MediCare Pharmacy",
    distance: "0.5 km",
    availability: "95%",
    price: "Competitive",
  },
  {
    id: 2,
    name: "Apollo Pharmacy",
    distance: "1.2 km",
    availability: "98%",
    price: "Standard",
  },
  {
    id: 3,
    name: "HealthPlus Drugstore",
    distance: "2.0 km",
    availability: "90%",
    price: "Budget",
  },
];

const PatientHome = () => {
  const navigate = useNavigate();

  // CHATBOT STATE (UNCHANGED)
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleProtectedClick = (route) => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    else navigate(route);
  };

  const closeChat = () => {
    setIsFullScreen(false);
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-gray-900 mb-6">
            Find Doctors, Medicines & Healthcare Services Near You
          </h1>

          <div className="flex items-center justify-center gap-2 mb-6">
            <MapPin className="w-5 h-5 text-blue-600" />
            <span className="text-blue-600">Your Location</span>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-2 flex items-center gap-3 max-w-2xl mx-auto">
            <Search className="w-5 h-5 text-gray-400 ml-3" />
            <input
              type="text"
              placeholder="Search by illness, doctor name, or medicine..."
              className="flex-1 py-3 outline-none"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl">
              Find Healthcare
            </button>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-gray-900 mb-8 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <ServiceCard
            icon={<Stethoscope className="w-8 h-8 text-blue-600" />}
            title="Doctor Consultation"
            onClick={() => handleProtectedClick("/appointments")}
          />
          <ServiceCard
            icon={<Pill className="w-8 h-8 text-green-600" />}
            title="Buy Medicines"
            onClick={() => handleProtectedClick("/medicines")}
          />
          <ServiceCard
            icon={<FlaskConical className="w-8 h-8 text-purple-600" />}
            title="Lab Tests"
            onClick={() => handleProtectedClick("/lab-tests")}
          />
          <ServiceCard
            icon={<FileText className="w-8 h-8 text-orange-600" />}
            title="Health Records"
            onClick={() => handleProtectedClick("/health-records")}
          />
          <ServiceCard
            icon={<Shield className="w-8 h-8 text-red-600" />}
            title="Insurance"
            onClick={() => handleProtectedClick("/insurance")}
          />
        </div>
      </section>

      {/* DOCTORS */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-gray-900 mb-8">Doctors Near You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>

      {/* PHARMACIES */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-gray-900 mb-8">Nearby Pharmacies</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pharmacies.map((pharmacy) => (
            <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} />
          ))}
        </div>
      </section>

      {/* EMERGENCY */}
      <section className="bg-gradient-to-br from-red-500 to-red-600 py-12 text-white text-center">
        <AlertCircle className="w-8 h-8 mx-auto mb-4" />
        <h3>Emergency SOS</h3>
        <button className="bg-white text-red-600 px-6 py-3 rounded-lg mt-4 flex items-center gap-2 mx-auto">
          <PhoneCall className="w-5 h-5" />
          Emergency Call
        </button>
      </section>

      {/* ================= CHATBOT (UNCHANGED) ================= */}

      {!isOpen && (
        <div className="baymax-robot" onClick={() => setIsOpen(true)}>
          🤖
        </div>
      )}

      {isOpen && !isFullScreen && (
        <div className="chat-window">
          <div className="chat-header">
            <span>BAYMAX AI</span>
            <div className="chat-controls">
              <button onClick={() => setIsFullScreen(true)}>■</button>
              <button onClick={closeChat}>✕</button>
            </div>
          </div>
          <div className="chat-body">
            <p>Hello 👋 I am BAYMAX. How can I assist you today?</p>
          </div>
          <div className="chat-input">
            <input type="text" placeholder="Type your message..." />
            <button>Send</button>
          </div>
        </div>
      )}

      {isOpen && isFullScreen && (
        <div className="chat-fullscreen">
          <div className="chat-full-header">
            <h3>BAYMAX AI Assistant</h3>
            <div className="chat-controls">
              <button onClick={() => setIsFullScreen(false)}>■</button>
              <button onClick={closeChat}>✕</button>
            </div>
          </div>
          <div className="chat-full-body">
            <p>
              Welcome to full-screen mode. Ask me anything about your health.
            </p>
          </div>
          <div className="chat-full-input">
            <input type="text" placeholder="Type your message..." />
            <button>Send</button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PatientHome;

/* COMPONENTS */

function ServiceCard({ icon, title, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl shadow-md p-6 text-center"
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-gray-900">{title}</h3>
    </button>
  );
}

function DoctorCard({ doctor }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <img
        src={doctor.image}
        alt={doctor.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <h3>{doctor.name}</h3>
        <p className="text-blue-600 text-sm">{doctor.specialization}</p>
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg mt-3">
          Book Appointment
        </button>
      </div>
    </div>
  );
}

function PharmacyCard({ pharmacy }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3>{pharmacy.name}</h3>
      <p className="text-sm text-gray-600">{pharmacy.distance}</p>
      <button className="w-full bg-green-600 text-white py-2 rounded-lg mt-3">
        Buy Now
      </button>
    </div>
  );
}