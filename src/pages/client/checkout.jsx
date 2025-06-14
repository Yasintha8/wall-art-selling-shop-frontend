import { TbTrash } from "react-icons/tb"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import getCart from "../../utils/cart"

export default function CheckoutPage() {
    const location = useLocation()
    const navigate = useNavigate()

    // Use location.state.items if available, else fallback to localStorage cart
    const [cart, setCart] = useState(() => {
        if (location.state?.items) {
            return location.state.items
        } else {
            return getCart()
        }
    })
    const [cartRefresh, setCartRefresh] = useState(false)
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    useEffect(() => {
        // Redirect if cart is empty
        if (!cart || cart.length === 0) {
            toast.error("Your cart is empty")
            navigate("/products")
        }
    }, [cart, navigate])

    function PlaceOrder() {
        if (!name || !address || !phoneNumber) {
            toast.error("Please fill all details")
            return
        }

        const orderData = {
            name,
            address,
            phoneNumber,
            billItems: cart.map((item) => ({
                productId: item.productId,
                quantity: item.quantity
            }))
        }

        const token = localStorage.getItem("token")
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/order", orderData, {
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(() => {
            toast.success("Order placed successfully")
            navigate("/")
        }).catch((error) => {
            console.error(error)
            toast.error("Order place failed")
        })
    }

    function getTotal() {
        return cart.reduce((total, product) => total + product.price * product.quantity, 0)
    }

    function getTotalForLabelledPrice() {
        return cart.reduce((total, product) => total + product.labeledPrice * product.quantity, 0)
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
                <p className="text-gray-600 mb-8">You have {cart.length} {cart.length === 1 ? 'item' : 'items'} in your order</p>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">
                    <div className="lg:col-span-8 space-y-6">
                        {cart.map((item, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-md p-4 sm:p-6 space-y-2">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-y-4 gap-x-6 text-center sm:text-left items-center">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-40 h-40 object-cover rounded-lg mx-auto sm:mx-0"
                                    />

                                    <div className="flex-1 min-w-0">
                                        <h3
                                            className="text-lg sm:text-xl font-semibold text-gray-800 cursor-pointer hover:text-primary transition"
                                            onClick={() => window.location.href = `/overview/${item.productId}`}
                                        >
                                            {item.name}
                                        </h3>
                                        {item.altNames?.length > 0 && (
                                            <p className="text-sm text-gray-500 mt-1">{item.altNames.join(" • ")}</p>
                                        )}
                                        <p className="text-base sm:text-lg text-primary font-semibold mt-2">LKR {item.price.toFixed(2)}</p>
                                    </div>

                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => {
                                                const newCart = [...cart]
                                                newCart[index].quantity = Math.max(1, newCart[index].quantity - 1)
                                                setCart(newCart)
                                                setCartRefresh(!cartRefresh)
                                            }}
                                            className="w-8 sm:w-10 h-8 sm:h-10 bg-white border rounded-md text-gray-600 hover:bg-gray-50"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 sm:w-10 text-center font-medium text-gray-800">{item.quantity}</span>
                                        <button
                                            onClick={() => {
                                                const newCart = [...cart]
                                                newCart[index].quantity += 1
                                                setCart(newCart)
                                                setCartRefresh(!cartRefresh)
                                            }}
                                            className="w-8 sm:w-10 h-8 sm:h-10 bg-white border rounded-md text-gray-600 hover:bg-gray-50"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div className="text-center sm:text-right min-w-[100px]">
                                        <p className="text-sm text-gray-500">Total</p>
                                        <p className="text-lg font-bold text-gray-900">LKR {(item.price * item.quantity).toFixed(2)}</p>
                                    </div>

                                    <button
                                        onClick={() => {
                                            const newCart = cart.filter((product) => product.productId !== item.productId)
                                            setCart(newCart)
                                        }}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition"
                                    >
                                        <TbTrash className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-xl shadow-md p-6 mt-8 lg:mt-0">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between text-gray-700 text-sm sm:text-base">
                                    <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                                    <span>LKR {getTotalForLabelledPrice().toFixed(2)}</span>
                                </div>

                                {(getTotalForLabelledPrice() - getTotal()) > 0 && (
                                    <div className="flex justify-between text-green-600 text-sm sm:text-base">
                                        <span>Discount</span>
                                        <span>-LKR {(getTotalForLabelledPrice() - getTotal()).toFixed(2)}</span>
                                    </div>
                                )}

                                <div className="border-t pt-4">
                                    <div className="flex justify-between text-lg sm:text-xl font-semibold text-gray-900">
                                        <span>Total</span>
                                        <span>LKR {getTotal().toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 space-y-4">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full border border-gray-300 px-4 py-3 rounded-md text-sm"
                                />
                                <input
                                    type="text"
                                    placeholder="Delivery Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full border border-gray-300 px-4 py-3 rounded-md text-sm"
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="w-full border border-gray-300 px-4 py-3 rounded-md text-sm"
                                />

                                <button
                                    onClick={PlaceOrder}
                                    className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:bg-primary-dark text-sm cursor-pointer"
                                >
                                    Place Order
                                </button>

                                <button
                                    onClick={() => navigate("/products")}
                                    className="w-full bg-gray-100 text-gray-700 py-3 rounded-md font-medium hover:bg-gray-200 text-sm cursor-pointer"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
