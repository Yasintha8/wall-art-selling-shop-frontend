import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import { IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";

export function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [modalIsDisplaying, setModalIsDisplaying] = useState(false);
    const [displayingOrder, setDisplayingOrder] = useState(null);

    useEffect(() => {
        if (!loaded) {
            const token = localStorage.getItem("token");
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/api/order", {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                })
                .then((response) => {
                    setOrders(response.data);
                    setLoaded(true);
                    console.log("Orders fetched successfully", response.data);
                })
                .catch(() => {
                    toast.error("Failed to fetch orders");
                });
        }
    }, [loaded]);

    function changeOrderStatus(orderID, status) {
        const token = localStorage.getItem("token");
        axios
            .put(
                import.meta.env.VITE_BACKEND_URL + "/api/order/" + orderID,
                { status },
                { headers: { Authorization: "Bearer " + token } }
            )
            .then((response) => {
                console.log("Order status changed successfully", response.data)
                toast.success("Order status updated");
                setLoaded(false);
            })
            .catch(() => toast.error("Status update failed"));
    }

    return (
        <div className="w-full h-full p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-6 text-gray-800">📦 Order Management</h1>

            {!loaded ? (
                <Loader />
            ) : (
                <>
                    <div className="overflow-x-auto rounded-md border border-gray-200">
                        <table className="w-full table-auto text-sm">
                            <thead className="bg-gray-100 text-gray-600 text-left">
                                <tr>
                                    <th className="p-3">Order ID</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">Customer</th>
                                    <th className="p-3">Address</th>
                                    <th className="p-3">Phone</th>
                                    <th className="p-3 text-center">Status</th>
                                    <th className="p-3 text-right">Total</th>
                                    <th className="p-3 text-right">Date</th>
                                    <th className="p-3 text-center">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr
                                        key={order.orderID}
                                        className="border-t hover:bg-gray-50 transition"
                                    >
                                        <td className="p-3">{order.orderID}</td>
                                        <td className="p-3">{order.email}</td>
                                        <td className="p-3">{order.name}</td>
                                        <td className="p-3">{order.address}</td>
                                        <td className="p-3">{order.phoneNumber}</td>
                                        <td className="p-3 text-center">
                                            <select
                                                value={order.status}
                                                onChange={(e) =>
                                                    changeOrderStatus(order.orderID, e.target.value)
                                                }
                                                className="bg-white border border-gray-300 rounded px-2 py-1 text-sm"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td className="p-3 text-right">LKR.{order.total.toFixed(2)}</td>
                                        <td className="p-3 text-right">
                                            {new Date(order.date).toLocaleDateString()}
                                        </td>
                                        <td className="p-3 text-center">
                                            <button
                                                onClick={() => {
                                                    setModalIsDisplaying(true);
                                                    setDisplayingOrder(order);
                                                }}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded shadow"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {modalIsDisplaying && displayingOrder && (
                        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                            <div className="w-full max-w-3xl h-[90vh] bg-white rounded-lg shadow-lg relative overflow-hidden">
                                <button
                                    onClick={() => setModalIsDisplaying(false)}
                                    className="absolute top-3 right-3 bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
                                    title="Close"
                                >
                                    <IoCloseSharp className="text-2xl text-gray-700" />
                                </button>

                                <div className="bg-gray-800 text-white p-6 rounded-t-lg">
                                    <h2 className="text-lg font-bold">
                                        Order ID: {displayingOrder.orderID}
                                    </h2>
                                    <p>Date: {new Date(displayingOrder.date).toDateString()}</p>
                                    <p>Status: {displayingOrder.status}</p>
                                    <p>Total: ${displayingOrder.total.toFixed(2)}</p>
                                </div>

                                <div className="overflow-y-auto p-4 h-[calc(100%-160px)]">
                                    {displayingOrder.billItems.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg mb-4 shadow-sm"
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.productName}
                                                className="w-20 h-20 object-cover rounded-lg border"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-800">
                                                    {item.productName}
                                                </h3>
                                                <p className="text-gray-500 text-sm">
                                                    {item.name} | Qty: {item.quantity}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Price: ${item.price.toFixed(2)} | Total: $
                                                    {(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
