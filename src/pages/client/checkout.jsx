import { TbTrash } from "react-icons/tb"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"

export default function CheckoutPage() {

    const location = useLocation()
    const [cart, setCart] = useState(location.state.items)
    const [cartRefresh, setCartRefresh] = useState(false)
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const navigate = useNavigate()

    function PlaceOrder(){
        const orderData = {
            name : name,
            address : address,
            phoneNumber : phoneNumber,
            billItems : []
        }
        for(let i=0; i<cart.length; i++){
            orderData.billItems[i] = {
                productId : cart[i].productId,
                quantity : cart[i].quantity
            }
        }
        const token = localStorage.getItem("token")
        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/order", orderData, {
            headers: {
                "Authorization": "Bearer "+token
            }
        }).then(()=>{
            toast.success("Order placed successfully")
            navigate("/")
        }).catch((error)=>{
            console.log(error)
            toast.error("Order place failed")
        })
    }

    function getTotal(){
        let total = 0;
        cart.forEach((product) => {
            total += product.price * product.quantity
        })
        return total
    }

    function getTotalForLabelledPrice(){
        let total = 0;
        cart.forEach((product) => {
            total += product.labeledPrice * product.quantity
        })
        return total
    }
    
    return(
        <div className="w-full h-full flex justify-center p-[50px]">
            <div className="w-full lg:w-[700px]">
                {
                    cart.map(
                        (item , index)=>{
                            return(
                            <div key={index} className="w-full lg:h-[100px] bg-white shadow-2xl my-[5px] flex lg:flex-row flex-col justify-between items-center relative p-[10px] rounded-lg">
                                <button className="absolute right-4 lg:right-[-50px] bg-red-500 w-[40px] h-[40px] rounded-full text-white flex justify-center items-center shadow cursor-pointer hover:bg-red-600 transition-all duration-300"
                                onClick={
                                    ()=>{
                                        const newCart = cart.filter((product) => product.productId !== item.productId)
                                        setCart(newCart)
                                    }
                                }>
                                    <TbTrash />
                                </button>
                                <img src={item.image} className="h-[150px] lg:h-full aspect-square object-cover rounded-lg" />
                                {/* product details for dekstop */}
                                <div className="hidden lg:flex flex-col h-full max-w-[300px] w-[300px] overflow-hidden">
                                    <h1 className="text-xl font-bold cursor-pointer" onClick={()=>{window.location.href="/overview/"+item.productId}}>{item.name}</h1>
                                    <h2 className="text-sm font-semibold text-gray-500">{item.altNames.join(" | ")}</h2>
                                    <h2 className="text-lg font-semibold text-accent">LKR: {item.price.toFixed(2)}</h2>
                                </div>
                                {/* product details for mobile */}
                                <div className="lg:hidden h-full max-w-[300px] w-[300px] overflow-hidden text-center">
                                    <h1 className="text-lg font-bold cursor-pointer" onClick={()=>{window.location.href="/overview/"+item.productId}}>{item.name}</h1>
                                    <h2 className="text-sm font-semibold text-gray-500">{item.altNames.join(" | ")}</h2>
                                    <h2 className="text-lg font-semibold text-accent">LKR: {item.price.toFixed(2)}</h2>
                                </div>
                                <div className="h-full w-[100px] flex justify-center items-center">
                                    <button className="text-2xl w-[20px] h-[20px] bg-gray-800 text-white rounded-full flex justify-center items-center cursor-pointer mx-[5px]"
                                        onClick={
                                            ()=>{
                                                const newCart = cart
                                                newCart[index].quantity -= 1
                                                if(newCart[index].quantity <= 0)newCart[index].quantity = 1
                                                setCart(newCart)
                                                setCartRefresh(!cartRefresh)
                                        }}
                                    >-</button>
                                    <h1 className="text-lg">{item.quantity}</h1>
                                    <button className="text-lg w-[20px] h-[20px] bg-gray-800 text-white rounded-full flex justify-center items-center cursor-pointer mx-[5px]"
                                        onClick={
                                            ()=>{
                                                 const newCart = cart
                                                 newCart[index].quantity += 1
                                                 setCart(newCart)
                                                 setCartRefresh(!cartRefresh)
                                            }
                                        }
                                    >+</button>
                                </div>
                                <div className="h-full w-[100px] flex justify-center items-center">
                                    <h1 className="text-xl w-full text-end pr-2"> {(item.price * item.quantity).toFixed(2)}</h1>
                                </div>
                            </div>
                        )
                        }
                    )
                }

                <div className="w-full flex justify-end mt-4">
                    <h1 className="w-[100px] text-xl  text-end pr-2">Total</h1>
                    <h1 className="w-[100px] text-xl  text-end pr-2">{getTotalForLabelledPrice().toFixed(2)}</h1>
                </div>

                <div className="w-full flex justify-end">
                    <h1 className="w-[100px] text-xl  text-end pr-2">Discount</h1>
                    <h1 className="w-[100px] text-xl border-b-double text-end pr-2 border-b-2 ">{(getTotalForLabelledPrice()-getTotal()).toFixed(2)}</h1>
                </div>

                <div className="w-full flex justify-end">
                    <h1 className="w-[100px] text-xl text-end pr-2">Net Total</h1>
                    <h1 className="w-[100px] text-xl text-end pr-2 border-b-[4px] border-double">{getTotal().toFixed(2)}</h1>
                </div>


                {/* Checkout Form */}
            <div className="w-full mt-10 p-6 bg-white rounded-lg shadow-md space-y-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
                    Customer Details
                </h2>

                {/* Name Field */}
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <label htmlFor="name" className="w-full md:w-[120px] text-lg font-medium text-gray-700">
                    Name
                    </label>
                    <input
                    type="text"
                    id="name"
                    className="w-full md:w-[300px] h-[50px] md:h-[45px] px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    />
                </div>

                {/* Address Field */}
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <label htmlFor="address" className="w-full md:w-[120px] text-lg font-medium text-gray-700">
                    Address
                    </label>
                    <input
                    type="text"
                    id="address"
                    className="w-full md:w-[300px] h-[50px] md:h-[45px] px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your address"
                    />
                </div>

                {/* Phone Number Field */}
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <label htmlFor="phone" className="w-full md:w-[120px] text-lg font-medium text-gray-700">
                    Phone Number
                    </label>
                    <input
                    type="text"
                    id="phone"
                    className="w-full md:w-[300px] h-[50px] md:h-[45px] px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-700"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number"
                    />
                </div>

                {/* Submit Button */}
                <div className="w-full flex justify-center md:justify-end">
                    <button
                    onClick={PlaceOrder}
                    className="mt-4 w-full md:w-[200px] h-[50px] bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all duration-300 cursor-pointer"
                    >
                    Place Order
                    </button>
                </div>
                </div>
            </div>
        </div>
    )
}