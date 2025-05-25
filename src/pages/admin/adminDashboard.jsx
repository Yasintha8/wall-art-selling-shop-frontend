import { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaShoppingCart, FaBoxOpen } from "react-icons/fa";

export default function AdminDashboard() {
    const [user, setUsers] = useState([]);
    const [order, setOrders] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const [userRes, orderRes, productRes] = await Promise.all([
                    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user/admin/all", {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    }),
                    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/order", {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    }),
                    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product", {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    }),
                ]);

                setUsers(userRes.data);
                setOrders(orderRes.data);
                setProducts(productRes.data);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">📊 Admin Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <DashboardCard
                    title="Total Users"
                    count={user.length}
                    icon={<FaUsers className="text-blue-500 w-6 h-6" />}
                    bg="bg-blue-50"
                    border="border-blue-300"
                />
                <DashboardCard
                    title="Total Orders"
                    count={order.length}
                    icon={<FaShoppingCart className="text-green-500 w-6 h-6" />}
                    bg="bg-green-50"
                    border="border-green-300"
                />
                <DashboardCard
                    title="Total Products"
                    count={products.length}
                    icon={<FaBoxOpen className="text-purple-500 w-6 h-6" />}
                    bg="bg-purple-50"
                    border="border-purple-300"
                />
            </div>
        </div>
    );
}

function DashboardCard({ title, count, icon, bg, border }) {
    return (
        <div
            className={`p-5 rounded-xl shadow-sm ${bg} ${border} border hover:shadow-md transition duration-300`}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600 text-sm font-medium">{title}</p>
                    <h2 className="text-3xl font-bold text-gray-800">{count}</h2>
                </div>
                <div className="p-3 rounded-full bg-white shadow-inner">
                    {icon}
                </div>
            </div>
        </div>
    );
}
