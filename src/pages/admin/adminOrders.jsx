import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../../components/loader"
import { IoCloseSharp } from "react-icons/io5"
import toast from "react-hot-toast"

export function AdminOrdersPage() {

    const [orders, setOrders] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [modalIsDisplaying, setModalIsDisplaying] = useState(false)
    const [displayingOrder, setDisplayingOrder] = useState(null)

    useEffect(
        ()=>{
            if(!loaded){
                const token = localStorage.getItem("token")
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/order", {
                    headers: {
                        "Authorization": "Bearer "+token
                    }
                }).then(
                    (response) => {
                    setOrders(response.data)
                    setLoaded(true)
                    console.log("Orders fetched successfully", response.data)
                }
            )
        }
    }, [loaded]
)

    function changeOrderStatus(orderID, status){
        const token = localStorage.getItem("token");
        axios.put(import.meta.env.VITE_BACKEND_URL + "/api/order/"+orderID, {
           status: status
        }, {
            headers: {
                "Authorization": "Bearer "+token
            }
        }).then(
            (response) => {
                console.log("Order status changed successfully", response.data)
                toast.success("Order status changed successfully")
                setLoaded(false)
            }
        )

    }
    return (
        <div className="w-full h-full rounded-lg relative">
            {
                loaded? 
                    <div className="w-full h-full">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th >Order ID</th>
                                    <th >Customer Email</th>
                                    <th >Customer Name</th>
                                    <th >Address</th>
                                    <th >Phone Number</th>
                                    <th >Status</th>
                                    <th >Total Price</th>
                                    <th >Date</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                       {
                        orders.map( 
                            (order)=>{
                                return (
                                    <tr key={order.orderID} 
                                    className="border-b-2 border-gray-300 text-center hover:bg-gray-100 cursor-pointer">
                                        <td className="p-2">{order.orderID}</td>
                                        <td className="p-2">{order.email}</td>
                                        <td className="p-2">{order.name}</td>
                                        <td className="p-2">{order.address}</td>
                                        <td className="p-2">{order.phoneNumber}</td>
                                        <td className="p-2">
                                            <select value={order.status} onChange={
                                                (e)=>{
                                                    changeOrderStatus(order.orderID, e.target.value)
                                                }
                                            }>
                                                <option value="Pending">Pending</option>
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td className="p-2">{order.total.toFixed(2)}</td>
                                        <td className="p-2">{new Date(order.date).toDateString()}</td>
                                        <td className="p-2">
                                            <button 
                                            onClick={()=>{
                                                setModalIsDisplaying(true)
                                                setDisplayingOrder(order)
                                            }}
                                            className="bg-blue-500 text-white p-2 rounded-lg cursor-pointer">Details</button></td>
                                    </tr>
                                )
                            }
                        )
                       }
                            </tbody>
                       </table>
                       {
                            modalIsDisplaying &&
                            <div className="fixed bg-black/70 w-full h-full top-0 left-0 flex justify-center items-center">
                                <div className="w-[600px] max-w-[600px] h-[600px] max-h-[600px]  bg-white relative">
                                    <div className="w-full h-[150px] bg-gray-800 ">
                                        <h1 className="text-white text-lg font-bold text-center pt-2">Order ID: {displayingOrder.orderID}</h1>
                                        <h1 className="text-white text-md font-bold text-center pt-2">Order Date: {new Date(displayingOrder.date).toDateString()}</h1>
                                        <h1 className="text-white text-md font-bold text-center pt-2">Order Status: {displayingOrder.status}</h1>
                                        <h1 className="text-white text-md font-bold text-center pt-2">Total Price: {displayingOrder.total.toFixed(2)}</h1>
                                    </div>
                                    <div className="w-full h-[450px] max-h-[450px] overflow-y-scroll">
                                        {
                                            displayingOrder.billItems.map(
                                                (item, index) => {
                                                    return (
                                                        <div key={index} className="w-full h-[100px] bg-white shadow-2xl my-[5px] flex justify-between items-center relative">
                                                            <img src={item.image}  className="h-full p-2 aspect-square object-cover rounded-xl"/>
                                                            <div className="h-full max-w-[300px] w-[300px] overflow-hidden">
                                                                <h1 className="text-lg font-bold">{item.productName}</h1>
                                                                <h1 className="text-md text-gray-500">{item.name}</h1>
                                                                <h1 className="text-md text-gray-500">Quantity: {item.quantity}</h1>
                                                                <h1 className="text-md text-gray-500">Price: {item.price.toFixed(2)}</h1>
                                                                <h1 className="text-md text-gray-500">Total: {(item.price * item.quantity).toFixed(2)}</h1>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            )
                                        }
                                    </div>
                                    <button 
                                    onClick={()=>{
                                        setModalIsDisplaying(false)
                                    }}
                                    className="absolute right-[-20px] top-[-20px] w-[40px] h-[40px] rounded-full bg-white shadow shadow-black  flex justify-center items-center">
                                        <IoCloseSharp className="cursor-pointer"/>
                                    </button>
                                </div>
                            </div>
                       }
                    </div>
                    :
                <Loader /> 
                
            }
        </div>
    )
}

