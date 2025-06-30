import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaBoxOpen, FaUserCircle, FaChevronDown } from "react-icons/fa";

export default function UserData() {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/user/current", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data.user);
          setLoading(false);
        })
        .catch(() => {
          setUser(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle mouse leave for dropdown
  const handleMouseLeave = () => {
    setShowMenu(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setShowMenu(false);
    window.location.href = "/login";
  };

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-12 h-12">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-accent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* User Button */}
      <button
        onClick={toggleMenu}
        className="flex items-center rounded-lg focus:ring-accent transition-all duration-200 ease-in-out group cursor-pointer"
        aria-haspopup="true"
        aria-expanded={showMenu}
      >
        {user ? (
          <>
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-accent to-accent/80 text-white text-sm font-medium">
              {user.name ? user.name.charAt(0).toUpperCase() : <FaUser className="text-[18px]" />}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-gray-600">
              <FaUser className="text-[18px]" />
            </div>
          </>
        )}
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-xl backdrop-blur-sm transition-all duration-200 ease-out z-50 ${
          showMenu 
            ? "opacity-100 scale-100 translate-y-0" 
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
        onMouseLeave={handleMouseLeave}
      >
        {!user ? (
          <div className="p-4 space-y-3">
            <div className="text-center pb-2 border-b border-gray-100">
              <p className="text-sm text-gray-600 font-medium">Welcome!</p>
              <p className="text-xs text-gray-500">Sign in to your account</p>
            </div>
            <Link
              to="/login"
              className="flex items-center justify-center w-full bg-accent hover:bg-accent/90 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm"
              onClick={() => setShowMenu(false)}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="flex items-center justify-center w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm"
              onClick={() => setShowMenu(false)}
            >
              Create Account
            </Link>
          </div>
        ) : (
          <div className="py-2">
            {/* User Info Header */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent/80 text-white text-sm font-medium">
                  {user.name ? user.name.charAt(0).toUpperCase() : <FaUser className="text-sm" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.email || 'user@example.com'}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              <Link
                to="/profile"
                className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50 text-gray-700 font-medium transition-colors duration-200 group"
                role="menuitem"
                onClick={() => setShowMenu(false)}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors duration-200">
                  <FaUser className="text-sm" />
                </div>
                <span className="text-sm">My Profile</span>
              </Link>
              
              <Link
                to="/orders"
                className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50 text-gray-700 font-medium transition-colors duration-200 group"
                role="menuitem"
                onClick={() => setShowMenu(false)}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-50 text-green-600 group-hover:bg-green-100 transition-colors duration-200">
                  <FaBoxOpen className="text-sm" />
                </div>
                <span className="text-sm">My Orders</span>
              </Link>
              
              <div className="border-t border-gray-100 my-1"></div>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-red-50 text-red-600 font-medium transition-colors duration-200 group cursor-pointer"
                role="menuitem"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 text-red-600 group-hover:bg-red-100 transition-colors duration-200">
                  <FaSignOutAlt className="text-sm" />
                </div>
                <span className="text-sm">Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}