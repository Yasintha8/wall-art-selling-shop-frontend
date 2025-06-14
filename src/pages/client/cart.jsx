import { TbTrash, TbShoppingCart, TbPlus, TbMinus } from "react-icons/tb"
import getCart, { addToCart, getTotal, getTotalForLabelledPrice, removeFromCart } from "../../utils/cart"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function CartPage() {
    const [cartLoaded, setCartLoaded] = useState(false)
    const [cart, setCart] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (!cartLoaded) {
            setCart(getCart())
            setCartLoaded(true)
        }
    }, [cartLoaded])

    const handleQuantityChange = async (item, change) => {
        setIsLoading(true)
        try {
            addToCart(item, change)
            setCartLoaded(false)
        } catch (error) {
            console.log(error)
            toast.error("Failed to update quantity")
        }
        setIsLoading(false)
    }

    const handleRemoveItem = async (productId, itemName) => {
        setIsLoading(true)
        try {
            removeFromCart(productId)
            setCartLoaded(false)
            toast.success(`${itemName} removed from cart`)
        } catch (error) {
            console.log(error)
            toast.error("Failed to remove item")
        }
        setIsLoading(false)
    }

    const handleCheckout = () => {
        if (cart.length === 0) {
            toast.error("Your cart is empty")
            return
        }
        navigate("/checkout", {
            state: { items: cart }
        })
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <TbShoppingCart className="mx-auto h-20 w-20 text-gray-300 mb-4" />
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                    <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
                    <button 
                        onClick={() => navigate("/products")}
                        className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-md shadow-md transition cursor-pointer"
                    >
                        Browse Products
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
                <p className="text-gray-600 mb-8">You have {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-8 space-y-6">
                        {cart.map((item, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                                    <img 
                                        src={item.image} 
                                        alt={item.name}
                                        className="w-40 h-40 sm:w-24 sm:h-24 object-cover rounded-lg mx-auto sm:mx-0"
                                    />

                                    <div className="flex flex-col sm:flex-row sm:justify-between w-full gap-4">
                                        <div className="flex-1 min-w-0">
                                            <h3 
                                                className="text-lg sm:text-xl font-semibold text-gray-800 cursor-pointer hover:text-primary transition text-center sm:text-left"
                                                onClick={() => window.location.href = `/overview/${item.productId}`}
                                            >
                                                {item.name}
                                            </h3>
                                            {item.altNames?.length > 0 && (
                                                <p className="text-sm text-gray-500 mt-1 text-center sm:text-left">{item.altNames.join(" • ")}</p>
                                            )}
                                            <p className="text-md sm:text-lg text-primary font-semibold mt-2 text-center sm:text-left">
                                                LKR {item.price.toFixed(2)}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => handleQuantityChange(item, -1)}
                                                disabled={isLoading || item.quantity <= 1}
                                                className="w-9 h-9 sm:w-10 sm:h-10 bg-white border rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-50 focus:outline-none cursor-pointer"
                                            >
                                                <TbMinus className="w-5 h-5 mx-auto" />
                                            </button>
                                            <span className="w-10 text-center font-medium text-gray-800">{item.quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(item, 1)}
                                                disabled={isLoading}
                                                className="w-9 h-9 sm:w-10 sm:h-10 bg-white border rounded-md text-gray-600 hover:bg-gray-50 disabled:opacity-50 focus:outline-none cursor-pointer"
                                            >
                                                <TbPlus className="w-5 h-5 mx-auto" />
                                            </button>
                                        </div>

                                        <div className="text-center sm:text-right min-w-[100px]">
                                            <p className="text-sm text-gray-500">Total</p>
                                            <p className="text-lg sm:text-xl font-bold text-gray-900">
                                                LKR {(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>

                                        <div className="flex justify-center sm:justify-end">
                                            <button
                                                onClick={() => handleRemoveItem(item.productId, item.name)}
                                                disabled={isLoading}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition focus:outline-none cursor-pointer"
                                            >
                                                <TbTrash className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 lg:sticky lg:top-4">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between text-gray-700">
                                    <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                                    <span>LKR {getTotalForLabelledPrice().toFixed(2)}</span>
                                </div>

                                {(getTotalForLabelledPrice() - getTotal()) > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount</span>
                                        <span>-LKR {(getTotalForLabelledPrice() - getTotal()).toFixed(2)}</span>
                                    </div>
                                )}

                                <div className="border-t pt-4">
                                    <div className="flex justify-between text-xl font-semibold text-gray-900">
                                        <span>Total</span>
                                        <span>LKR {getTotal().toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={isLoading || cart.length === 0}
                                className="w-full mt-6 bg-primary text-white py-3 rounded-md font-semibold hover:bg-primary-dark disabled:opacity-50 cursor-pointer"
                            >
                                {isLoading ? 'Processing...' : 'Proceed to Checkout'}
                            </button>

                            <button
                                onClick={() => navigate("/products")}
                                className="w-full mt-3 bg-gray-100 text-gray-700 py-3 rounded-md font-medium hover:bg-gray-200 cursor-pointer"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
