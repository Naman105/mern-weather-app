import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { WiDaySunny } from "react-icons/wi";
import { FaSignOutAlt, FaUser } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl">
          <WiDaySunny size={32} className="text-yellow-300" />
          WeatherApp
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-blue-200 text-sm flex items-center gap-2">
                <FaUser size={12} /> {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-blue-200 hover:text-white text-sm transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-semibold transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
