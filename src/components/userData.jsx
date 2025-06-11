import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaBoxOpen } from "react-icons/fa";

export default function UserData() {
  const [user, setUser] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/user/current", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setUser(res.data.user))
        .catch(() => setUser(null));
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setShowLogout(false);
    window.location.href = "/login";
  };

  if (!user) {
    return (
      <div className="flex items-center gap-2 sm:gap-4">
        <Link
          to="/login"
          className="bg-accent text-white px-3 py-1.5 sm:px-5 sm:py-2 rounded-lg font-semibold text-sm sm:text-base hover:bg-white hover:text-accent transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-accent text-white px-3 py-1.5 sm:px-5 sm:py-2 rounded-lg font-semibold text-sm sm:text-base hover:bg-white hover:text-accent transition"
        >
          Register
        </Link>
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left">
      {/* User Icon */}
      <button
        onClick={() => setShowLogout((prev) => !prev)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition cursor-pointer"
        aria-haspopup="true"
        aria-expanded={showLogout}
      >
        <FaUser className="text-xl" />
      </button>

      {/* Dropdown menu */}
      <div
        className={`absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-secondary ring-opacity-5 focus:outline-none transition transform z-10 ${
          showLogout
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu"
        onMouseLeave={() => setShowLogout(false)}
      >
        <Link
          to="/profile"
          className="flex items-center gap-2 w-full px-4 py-2 text-left hover:text-gray-900 hover:underline text-gray-700 font-semibold transition cursor-pointer"
          role="menuitem"
        >
          <FaUser className="text-base" />
          Profile
        </Link>
        <Link
          to="/orders"
          className="flex items-center gap-2 w-full px-4 py-2 text-left hover:text-gray-900 hover:underline text-gray-700 font-semibold transition cursor-pointer"
          role="menuitem"
        >
          <FaBoxOpen className="text-base" />
          Orders
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-4 py-2 text-left hover:text-red-700 hover:underline text-red-600 font-semibold transition cursor-pointer"
          role="menuitem"
        >
          <FaSignOutAlt className="text-base" />
          Logout
        </button>
      </div>
    </div>
  );
}
