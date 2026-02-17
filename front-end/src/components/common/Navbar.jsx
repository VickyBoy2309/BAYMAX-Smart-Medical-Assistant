import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const Navbar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-sky-600">
          BAYMAX
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <Link to="/medicines" className="hover:text-sky-600">Buy Medicines</Link>
          <Link to="/appointments" className="hover:text-sky-600">Doctor Appointment</Link>
          <Link to="/lab-tests" className="hover:text-sky-600">Lab Tests</Link>
          <Link to="/records" className="hover:text-sky-600">Health Records</Link>
          <Link to="/insurance" className="hover:text-sky-600">Insurance</Link>
        </nav>

        {/* Search Bar */}
        <div className="hidden md:flex items-center border rounded-full px-3 py-1 w-80">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search doctor, hospital, medicine"
            className="ml-2 w-full outline-none text-sm"
          />
        </div>

        {/* Auth Section */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/login" className="text-sky-600 font-medium">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-sky-600 text-white px-4 py-1 rounded-full hover:bg-sky-700"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative group">
              <button className="flex items-center gap-2">
                <User size={20} />
                {user.name}
              </button>
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40 hidden group-hover:block">
                <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-white">
          <Link to="/medicines" className="block">Buy Medicines</Link>
          <Link to="/appointments" className="block">Doctor Appointment</Link>
          <Link to="/lab-tests" className="block">Lab Tests</Link>
          <Link to="/records" className="block">Health Records</Link>
          <Link to="/insurance" className="block">Insurance</Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;