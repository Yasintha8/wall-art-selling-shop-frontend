import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

export default function UserData() {
  const [user, setUser] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const token = localStorage.getItem("token");
  const dropdownRef = useRef(null);

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

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <div ref={dropdownRef} className="relative inline-block text-left">
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
        className={`absolute right-0 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-secondary ring-opacity-5 focus:outline-none transition transform ${
          showLogout
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu"
      >
        <button
          onClick={handleLogout}
          className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 font-semibold transition"
          role="menuitem"
        >
          Logout
        </button>
        <div>
          <Link
            to="/orders"
            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 font-semibold transition"
            role="menuitem"
          >
            Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
