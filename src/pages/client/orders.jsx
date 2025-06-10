import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            window.location.href = "/login";
            return;
        }

        axios
            .get(import.meta.env.VITE_BACKEND_URL + "/api/order", {
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
            .then((res) => setOrders(res.data))
            .catch((error) => {
                console.error(error);
                toast.error("Failed to fetch orders.");
            });
    }, []);

    const handleDelete = (orderID) => {
    toast(
        (t) => (
            <span className="flex flex-col gap-2">
                <p>Are you sure you want to delete this order?</p>
                <div className="flex gap-2 justify-end">
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id);
                            try{
                                await axios.delete(
                                    import.meta.env.VITE_BACKEND_URL + "/api/order/" + orderID,
                                    {
                                        headers: {
                                            Authorization: "Bearer " + token,
                                        },
                                    }
                                );
                                toast.success("Order deleted successfully");
                                setOrders((prev) => prev.filter((order) => order.orderID !== orderID));
                            }catch (error) {
                                console.error("Error Deleting Order:", error);
                                toast.error("Failed to delete order. Please try again later.");
                            }
                        }}
                        className="text-white bg-red-500 hover:bg-red-600 text-sm px-3 py-1 rounded cursor-pointer"
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="text-gray-700 border border-gray-300 hover:bg-gray-100 text-sm px-3 py-1 rounded cursor-pointer"
                    >
                        No
                    </button>
                </div>
            </span>
        ),
        { duration: 10000 }
    );
};


    const formatDate = (isoDate) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(isoDate).toLocaleDateString(undefined, options);
    };

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "delivered":
                return "bg-green-100 text-green-800";
            case "cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">My Orders</h1>

                {orders.length === 0 ? (
                    <p className="text-center text-gray-500">You have no orders yet.</p>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.orderID} className="bg-white shadow-md rounded-xl p-6 transition hover:shadow-lg">
                                <div className="flex justify-between items-start gap-4">
                                    <div className="w-full">
                                        <div className="flex justify-between items-center mb-2">
                                            <h2 className="text-lg font-semibold text-gray-800">Order #{order.orderID}</h2>
                                            <span className={`text-sm px-2 py-1 rounded-full ${getStatusStyle(order.status)}`}>
                                                {order.status || "Pending"}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600"><strong>Name:</strong> {order.name}</p>
                                        <p className="text-sm text-gray-600"><strong>Address:</strong> {order.address}</p>
                                        <p className="text-sm text-gray-600"><strong>Phone:</strong> {order.phoneNumber}</p>
                                        {order.date && (
                                            <p className="text-sm text-gray-600"><strong>Date:</strong> {formatDate(order.date)}</p>
                                        )}
                                        <div className="mt-4">
                                            <p className="text-sm font-medium text-gray-700 mb-1">Items:</p>
                                            <ul className="space-y-2">
                                                {order.billItems.map((item, idx) => (
                                                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                                                        <img
                                                            src={item.image}
                                                            alt={item.productName}
                                                            className="w-12 h-12 object-cover rounded border"
                                                        />
                                                        <span>{item.productName} × {item.quantity}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="min-w-max">
                                        <p className="text-right font-semibold text-lg text-gray-800 mb-2">
                                            LKR {order.total.toFixed(2)}
                                        </p>
                                        <button
                                            onClick={() => handleDelete(order.orderID)}
                                            className="text-sm text-red-600 hover:text-red-800 border border-red-200 hover:border-red-400 rounded px-3 py-1 transition cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
