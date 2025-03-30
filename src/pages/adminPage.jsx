import { Link, Route, Routes } from "react-router-dom";
import { FaUsers } from "react-icons/fa6";
import { MdOutlineStorefront } from "react-icons/md";
import { FaFileInvoice } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

export default function AdminPage() {
    return (
        <div className="w-full h-screen bg-gray-200 flex p-2">
            <div className="h-full w-[300px]">
              <Link to="/admin/dashboard" className="flex items-center p-2"><MdDashboard className="mr-2"/>Dashboard</Link>
              <Link to="/admin/products" className="flex items-center p-2"><MdOutlineStorefront className="mr-2" /> Products</Link>
              <Link to="/admin/orders" className="flex items-center p-2"><FaFileInvoice className="mr-2" />Orders</Link>
              <Link to="/admin/users" className="flex items-center p-2"><FaUsers className="mr-2"/>Users</Link>
            </div>
            <div className="h-full bg-white w-[calc(100%-300px)] rounded-lg">
                <Routes path="/*">
                    <Route path="/dashboard" element={<h1>Dashboard</h1>} />
                    <Route path="/products" element={<h1>Products</h1>} />
                    <Route path="/orders" element={<h1>Orders</h1>} />
                    <Route path="/users" element={<h1>Users</h1>} />
                </Routes>
            </div>
        </div>
    );
}