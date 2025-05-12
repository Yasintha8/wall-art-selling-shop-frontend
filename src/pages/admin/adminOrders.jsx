import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../../components/loader"

export function AdminOrdersPage() {

    const [orders, setOrders] = useState([])
    const [loaded, setLoaded] = useState(false)

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
    return (
        <div className="w-full h-full rounded-lg relative">
            {
                loaded? 
                    <div className="w-full h-full">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="p-2">Order ID</th>
                                    <th className="p-2">Customer Email</th>
                                    <th className="p-2">Customer Name</th>
                                    <th className="p-2">Address</th>
                                    <th className="p-2">Phone Number</th>
                                    <th className="p-2">Status</th>
                                    <th className="p-2">Total Price</th>
                                    <th className="p-2">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                       {
                        orders.map(
                            (order)=>{
                                return (
                                    <tr key={order.orderId} className="border-b-2 border-gray-300 text-center hover:bg-gray-100 cursor-pointer">
                                        <td className="p-2">{order.orderID}</td>
                                        <td className="p-2">{order.email}</td>
                                        <td className="p-2">{order.name}</td>
                                        <td className="p-2">{order.address}</td>
                                        <td className="p-2">{order.phoneNumber}</td>
                                        <td className="p-2">{order.status}</td>
                                        <td className="p-2">{order.total.toFixed(2)}</td>
                                        <td className="p-2">{new Date(order.date).toDateString()}</td>
                                    </tr>
                                )
                            }
                        )
                       }
                            </tbody>
                       </table>
                    </div>
                    :
                <Loader /> 
                
            }
        </div>
    )
}