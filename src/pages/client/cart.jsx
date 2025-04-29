import { TbTrash } from "react-icons/tb"
import getCart, { addToCart, removeFromCart } from "../../utils/cart"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"

export default function CartPage() {

    const [cartLoaded, setCartLoaded] = useState(false)
    const [cart, setCart] = useState([])
    useEffect(
        ()=>{
            if(cartLoaded == false){
                setCart(getCart())
                setCartLoaded(true)
            }
        },[cartLoaded]
    )
    return(
        <div className="w-full h-full flex justify-center p-[50px]">
            <div className="w-[700px]">
                {
                    cart.map(
                        (item , index)=>{
                            return(
                            <div key={index} className="w-full h-[100px] bg-white shadow-2xl my-[5px] flex justify-between items-center relative p-[10px] rounded-lg">
                                <button className="absolute right-[-50px] bg-red-500 w-[40px] h-[40px] rounded-full text-white flex justify-center items-center shadow cursor-pointer hover:bg-red-600 transition-all duration-300"
                                onClick={
                                    ()=>{
                                        removeFromCart(item.productId)
                                        setCartLoaded(false)
                                        toast.success("Item removed from cart")
                                    }
                                }>
                                    <TbTrash />
                                </button>
                                <img src={item.image} className="h-full aspect-square object-cover rounded-lg" />
                                <div className="h-full max-w-[300px] w-[300px] overflow-hidden">
                                    <h1 className="text-xl font-bold cursor-pointer" onClick={()=>{window.location.href="/overview/"+item.productId}}>{item.name}</h1>
                                    <h2 className="text-sm font-semibold text-gray-500">{item.altNames.join(" | ")}</h2>
                                    <h2 className="text-lg font-semibold text-gray-500">LKR: {item.price.toFixed(2)}</h2>
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
                                    <h1 className="text-xl"> {(item.price * item.quantity).toFixed(2)}</h1>
                                </div>
                            </div>
                        )
                        }
                    )
                }
            </div>
        </div>
    )
}