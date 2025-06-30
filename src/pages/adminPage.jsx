import { Link, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { FaUsers } from "react-icons/fa6";
import { MdOutlineStorefront } from "react-icons/md";
import { FaFileInvoice } from "react-icons/fa";
import AdminProductPage from "./admin/products";
import AddProductForm from "./admin/addProducts";
import EditProductForm from "./admin/editProductForm";
import { AdminOrdersPage } from "./admin/adminOrders";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import toast from "react-hot-toast";
import axios from "axios";
import { Users } from "./admin/users";
import AdminDashboard from "./admin/adminDashboard";

export default function AdminPage() {
  const [userValidated, setUserValidated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("You are not logged in");
      navigate("/login");
    } else {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/user/current", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          if (response.data.user.role === "admin") {
            setUserValidated(true);
          } else {
            toast.error("You are not an admin");
            navigate("/login");
          }
        })
        .catch(() => {
          toast.error("Something went wrong, please login again");
          navigate("/login");
        });
    }
  }, [navigate]);

  const navLinks = [
    { to: "/admin/", label: "Dashboard", icon: <FaFileInvoice /> },
    { to: "/admin/users", label: "Users", icon: <FaUsers /> },
    { to: "/admin/products", label: "Products", icon: <MdOutlineStorefront /> },
    { to: "/admin/orders", label: "Orders", icon: <FaFileInvoice /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col p-6 space-y-6">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4 border-b border-indigo-300 pb-2">
          Admin Panel
        </h2>
        <nav className="flex flex-col space-y-2">
          {navLinks.map(({ to, label, icon }) => {
            const isActive = location.pathname === to || location.pathname.startsWith(to + "/");
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-colors
                  ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-700"
                  }`}
              >
                <span className="text-lg">{icon}</span> {label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-auto rounded-r-lg bg-white shadow-inner">
        {userValidated ? (
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/products" element={<AdminProductPage />} />
            <Route path="/orders" element={<AdminOrdersPage />} />
            <Route path="/addproducts" element={<AddProductForm />} />
            <Route path="/editproducts" element={<EditProductForm />} />
          </Routes>
        ) : (
          <div className="flex items-center justify-center h-full">
            <Loader />
          </div>
        )}
      </main>
    </div>
  );
}
