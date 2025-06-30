import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrashAlt, FaBox, FaCalendarAlt, FaUser, FaMapMarkerAlt, FaPhone, FaShoppingBag, FaEllipsisV, FaEye } from "react-icons/fa";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingOrderId, setDeletingOrderId] = useState(null);
    const [expandedOrder, setExpandedOrder] = useState(null);
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
            .then((res) => {
                setOrders(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to fetch orders.");
                setLoading(false);
            });
    }, []);

    const handleDelete = (orderID) => {
        toast(
            (t) => (
                <div className="bg-white rounded-lg p-4 shadow-lg border">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <FaTrashAlt className="text-white text-sm" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">Confirm Deletion</h3>
                            <p className="text-sm text-gray-600 mb-4">Are you sure you want to delete order #{orderID}? This action is irreversible.</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={async () => {
                                        toast.dismiss(t.id);
                                        setDeletingOrderId(orderID);
                                        try {
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
                                        } catch (error) {
                                            console.error("Error Deleting Order:", error);
                                            toast.error("Failed to delete order. Please try again later.");
                                        } finally {
                                            setDeletingOrderId(null);
                                        }
                                    }}
                                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm font-medium px-4 py-2 rounded-full transition-all transform hover:scale-105"
                                >
                                    Yes, Delete
                                </button>
                                <button
                                    onClick={() => toast.dismiss(t.id)}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-full transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ),
            { duration: 10000 }
        );
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return "Today";
        if (diffDays === 2) return "Yesterday";
        if (diffDays <= 7) return `${diffDays - 1} days ago`;
        
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
    };

    const getStatusConfig = (status) => {
        switch (status?.toLowerCase()) {
            case "pending":
                return {
                    color: "from-red-400 to-orange-500",
                    bg: "bg-gradient-to-r from-yellow-50 to-orange-50",
                    text: "text-orange-800",
                    icon: "🕐"
                };
            case "processing":
                return {
                    color: "from-blue-400 to-blue-600",
                    bg: "bg-gradient-to-r from-blue-50 to-indigo-50",
                    text: "text-blue-800",
                    icon: "⚡"
                };
            case "shipped":
                return {
                    color: "from-purple-400 to-purple-600",
                    bg: "bg-gradient-to-r from-purple-50 to-pink-50",
                    text: "text-purple-800",
                    icon: "🚀"
                };
            case "delivered":
                return {
                    color: "from-green-400 to-green-600",
                    bg: "bg-gradient-to-r from-green-50 to-emerald-50",
                    text: "text-green-800",
                    icon: "🎉"
                };
            case "cancelled":
                return {
                    color: "from-red-400 to-red-600",
                    bg: "bg-gradient-to-r from-red-50 to-pink-50",
                    text: "text-red-800",
                    icon: "❌"
                };
            default:
                return {
                    color: "from-gray-400 to-gray-600",
                    bg: "bg-gradient-to-r from-gray-50 to-slate-50",
                    text: "text-gray-800",
                    icon: "📦"
                };
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-8">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-ping opacity-75"></div>
                        <div className="relative w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <FaShoppingBag className="text-white text-2xl" />
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading Your Orders</h2>
                    <p className="text-gray-600">Please wait while we fetch your order history...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {/* Floating Header */}
            <div className="sticky top-0 z-10 backdrop-blur-md bg-white/80 border-b border-white/20">
                <div className="max-w-6xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center transform rotate-3">
                                <FaShoppingBag className="text-white text-xl" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                    Order History
                                </h1>
                                <p className="text-gray-600 font-medium">Track your purchases and deliveries</p>
                            </div>
                        </div>
                        <div className="hidden sm:flex items-center gap-3 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                            <span className="text-sm font-medium text-gray-700">{orders.length} Orders</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                {orders.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="relative w-32 h-32 mx-auto mb-8">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl transform rotate-6"></div>
                            <div className="relative w-full h-full bg-gradient-to-br from-white to-gray-100 rounded-3xl flex items-center justify-center border border-gray-200">
                                <FaBox className="text-gray-400 text-4xl" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">No Orders Yet</h3>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">Start your shopping journey! Browse our amazing products and place your first order.</p>
                        <button 
                            onClick={() => window.location.href = "/"}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            Explore Products
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {orders.map((order) => {
                            const statusConfig = getStatusConfig(order.status);
                            const isExpanded = expandedOrder === order.orderID;
                            
                            return (
                                <div key={order.orderID} className="group">
                                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
                                        {/* Status Bar */}
                                        <div className={`h-2 bg-gradient-to-r ${statusConfig.color}`}></div>
                                        
                                        {/* Card Header */}
                                        <div className="p-6 pb-4">
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="text-lg font-bold text-gray-800">#{order.orderID}</h3>
                                                        <div className={`px-3 py-1 rounded-full ${statusConfig.bg} ${statusConfig.text} text-xs font-semibold flex items-center gap-1`}>
                                                            <span>{statusConfig.icon}</span>
                                                            {order.status || "Pending"}
                                                        </div>
                                                    </div>
                                                    {order.date && (
                                                        <p className="text-sm text-gray-600 font-medium">
                                                            {formatDate(order.date)}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                                        LKR {order.total.toFixed(2)}
                                                    </p>
                                                    <p className="text-xs text-gray-500 font-medium">
                                                        {order.billItems.length} item{order.billItems.length !== 1 ? 's' : ''}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Quick Info */}
                                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                                                <div className="flex items-center gap-2">
                                                    <FaUser className="text-xs" />
                                                    <span className="font-medium truncate max-w-24">{order.name}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FaPhone className="text-xs" />
                                                    <span className="font-medium">{order.phoneNumber}</span>
                                                </div>
                                            </div>

                                            {/* Product Preview */}
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="flex -space-x-2">
                                                    {order.billItems.slice(0, 3).map((item, idx) => (
                                                        <div key={idx} className="w-10 h-10 rounded-xl border-2 border-white bg-gray-100 overflow-hidden">
                                                            <img
                                                                src={item.image}
                                                                alt={item.productName}
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => {
                                                                    e.target.style.display = 'none';
                                                                }}
                                                            />
                                                        </div>
                                                    ))}
                                                    {order.billItems.length > 3 && (
                                                        <div className="w-10 h-10 rounded-xl border-2 border-white bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                                            <span className="text-xs font-semibold text-gray-600">+{order.billItems.length - 3}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600 font-medium truncate">
                                                    {order.billItems[0]?.productName}
                                                    {order.billItems.length > 1 && ` +${order.billItems.length - 1} more`}
                                                </p>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                <button
                                                    onClick={() => setExpandedOrder(isExpanded ? null : order.orderID)}
                                                    className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-full transition-colors cursor-pointer"
                                                >
                                                    <FaEye className="text-xs" />
                                                    {isExpanded ? 'Hide Details' : 'View Details'}
                                                </button>
                                                
                                                <button
                                                    onClick={() => handleDelete(order.orderID)}
                                                    disabled={deletingOrderId === order.orderID}
                                                    className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-full transition-colors disabled:opacity-50 cursor-pointer"
                                                >
                                                    {deletingOrderId === order.orderID ? (
                                                        <>
                                                            <div className="w-3 h-3 border-2 border-red-600 border-t-transparent rounded-full animate-spin cursor-pointer"></div>
                                                            Deleting...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FaTrashAlt className="text-xs" />
                                                            Delete
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Expanded Details */}
                                        {isExpanded && (
                                            <div className="border-t border-gray-100 bg-gray-50/50 p-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {/* Delivery Info */}
                                                    <div>
                                                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                                            <FaMapMarkerAlt className="text-blue-500" />
                                                            Delivery Address
                                                        </h4>
                                                        <div className="bg-white rounded-xl p-4 border border-gray-200">
                                                            <p className="text-sm text-gray-800 font-semibold mb-1">{order.name}</p>
                                                            <p className="text-sm text-gray-600 mb-2">{order.address}</p>
                                                            <p className="text-sm text-gray-600">{order.phoneNumber}</p>
                                                        </div>
                                                    </div>

                                                    {/* Items */}
                                                    <div>
                                                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                                            <FaBox className="text-green-500" />
                                                            Order Items
                                                        </h4>
                                                        <div className="space-y-2">
                                                            {order.billItems.map((item, idx) => (
                                                                <div key={idx} className="bg-white rounded-xl p-3 border border-gray-200 flex items-center gap-3">
                                                                    <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden">
                                                                        <img
                                                                            src={item.image}
                                                                            alt={item.productName}
                                                                            className="w-full h-full object-cover"
                                                                            onError={(e) => {
                                                                                e.target.style.display = 'none';
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <p className="text-sm font-medium text-gray-800 truncate">{item.productName}</p>
                                                                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}