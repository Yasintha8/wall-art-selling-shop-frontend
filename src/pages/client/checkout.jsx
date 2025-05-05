import { TbTrash } from "react-icons/tb"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function CheckoutPage() {

    const location = useLocation()
    const [cart, setCart] = useState(location.state.items)
    const [cartRefresh, setCartRefresh] = useState(false)
    const navigate = useNavigate()

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
            <div className="w-[700px]">
                {
                    cart.map(
                        (item , index)=>{
                            return(
                            <div key={index} className="w-full h-[100px] bg-white shadow-2xl my-[5px] flex justify-between items-center relative p-[10px] rounded-lg">
                                <button className="absolute right-[-50px] bg-red-500 w-[40px] h-[40px] rounded-full text-white flex justify-center items-center shadow cursor-pointer hover:bg-red-600 transition-all duration-300"
                                onClick={
                                    ()=>{
                                        const newCart = cart.filter((product) => product.productId !== item.productId)
                                        setCart(newCart)
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

                <div className="w-full flex justify-end">
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
                    <button className="w-[170px] h-[50px] bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all duration-300 " 
                        onClick={()=>{
                            navigate("/checkout",
                                {
                                    state: {
                                        items: cart
                                    }
                                }
                            )}}>
                        Place Order</button>
                </div>
            </div>
        </div>
    )
}