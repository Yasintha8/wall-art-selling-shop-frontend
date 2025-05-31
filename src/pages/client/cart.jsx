import { TbTrash } from "react-icons/tb"
import getCart, { addToCart, getTotal, getTotalForLabelledPrice, removeFromCart } from "../../utils/cart"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function CartPage() {

    const [cartLoaded, setCartLoaded] = useState(false)
    const [cart, setCart] = useState([])
    const navigate = useNavigate()
    useEffect(
        ()=>{
            if(cartLoaded == false){
                setCart(getCart())
                setCartLoaded(true)
            }
        },[cartLoaded]
    )
    return(
        <div className="w-full flex justify-center p-[50px] mt-6">
            <div className="w-full lg:w-[700px]">
                {
                    cart.map(
                        (item , index)=>{
                            return(
                            <div key={index} className="w-full lg:h-[100px] bg-white shadow-2xl my-[5px] flex lg:flex-row flex-col justify-between items-center relative p-[10px] rounded-lg">
                                <button className="absolute right-4 lg:right-[-50px] bg-red-500 w-[40px] h-[40px] rounded-full text-white flex justify-center items-center shadow cursor-pointer hover:bg-red-600 transition-all duration-300"
                                onClick={
                                    ()=>{
                                        removeFromCart(item.productId)
                                        setCartLoaded(false)
                                        toast.success("Item removed from cart")
                                    }
                                }>
                                    <TbTrash />
                                </button>
                                <img src={item.image} className="h-[150px] lg:h-full aspect-square object-cover rounded-lg" />
                                {/* product details for dekstop */}
                                <div className="hidden lg:flex flex-col h-full max-w-[300px] w-[300px] overflow-hidden">
                                    <h1 className="text-lg font-bold cursor-pointer" onClick={()=>{window.location.href="/overview/"+item.productId}}>{item.name}</h1>
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
                                                addToCart(item, -1)
                                                setCartLoaded(false)
                                        }}
                                    >-</button>
                                    <h1 className="text-lg">{item.quantity}</h1>
                                    <button className="text-lg w-[20px] h-[20px] bg-gray-800 text-white rounded-full flex justify-center items-center cursor-pointer mx-[5px]"
                                        onClick={
                                            ()=>{
                                                addToCart(item, 1)
                                                setCartLoaded(false)
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
                
                <div className="w-full flex justify-end mt-4 mb-4">
                    <button className="w-[170px] h-[50px] bg-primary text-white rounded-lg hover:bg-primary-dark transition-all duration-300 cursor-pointer mb-4 " 
                        onClick={()=>{
                            navigate("/checkout",
                                {
                                    state: {
                                        items: cart
                                    }
                                }
                            )}}>
                        Checkout</button>
                </div>
            </div>
        </div>
    )
}