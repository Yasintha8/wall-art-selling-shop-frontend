import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa6";
import { MdOutlineStorefront } from "react-icons/md";
import { FaFileInvoice } from "react-icons/fa";
import AdminProductPage from "./admin/products";
import AddProductForm from "./admin/addProducts";
import EditProductForm from "./admin/editProductForm";
import { AdminOrdersPage } from "./admin/adminOrders";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import toast from "react-hot-toast";
import axios from "axios";

export default function AdminPage() {
    const [userValidated, setUserValidated] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token == null){
            toast.error("You are not logged in")
        }else{
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user/current", {
                headers: {
                    "Authorization": "Bearer "+token
                },
        }).then((response) => {
            if(response.data.user.role == "admin"){
                setUserValidated(true)
            }else{
                toast.error("You are not an admin")
                navigate("/login")
            }
        }).catch(() => {
            toast.error("Something went wrong please login again")
            navigate("/login")
        })
        }
    })
    return (
        <div className="w-full h-screen bg-gray-200 flex p-2">
            {userValidated ?
             <>
                <div className="h-full w-[300px]">
                <Link to="/admin/users" className="flex items-center p-2"><FaUsers className="mr-2"/>Users</Link>
                <Link to="/admin/products" className="flex items-center p-2"><MdOutlineStorefront className="mr-2" /> Products</Link>
                <Link to="/admin/orders" className="flex items-center p-2"><FaFileInvoice className="mr-2" />Orders</Link>
                </div>
                <div className="h-full bg-white w-[calc(100%-300px)] rounded-lg overflow-y-auto">
                    <Routes path="/*">
                    <Route path="/users" element={<h1>Users</h1>} />
                        <Route path="/products" element={<AdminProductPage />} />
                        <Route path="/orders" element={<AdminOrdersPage />} />
                        <Route path="/addproducts" element={<AddProductForm />} />
                        <Route path="/editproducts" element={<EditProductForm />} />
                    </Routes>
                </div>
            </>
            :
            <Loader />
      }

        </div>
    );
}