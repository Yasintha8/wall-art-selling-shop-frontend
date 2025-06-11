import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaBoxOpen } from "react-icons/fa";

export default function UserData() {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
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
    setShowMenu(false);
    window.location.href = "/login";
  };

  return (
    <div className="relative inline-block text-left z-50">
      {/* User Icon */}
      <button
        onClick={() => setShowMenu((prev) => !prev)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white hover:bg-accent-dark focus:ring-accent transition cursor-pointer"
        aria-haspopup="true"
        aria-expanded={showMenu}
      >
        <FaUser className="text-xl" />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-secondary ring-opacity-5 focus:outline-none transition transform ${
          showMenu ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
        onMouseLeave={() => setShowMenu(false)}
      >
        {!user ? (
          <div className="flex flex-col p-2 space-y-2">
            <Link
              to="/login"
              className="w-full text-center bg-accent hover:bg-accent/30 hover:text-accent border border-accent text-white font-semibold py-2 rounded transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="w-full text-center bg-white border border-accent hover:bg-accent/10 text-accent font-semibold py-2 rounded transition"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="py-1">
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
        )}
      </div>
    </div>
  );
}
