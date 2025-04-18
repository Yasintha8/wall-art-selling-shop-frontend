import axios from "axios"
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function AdminProductPage(){

    const [products, setProducts] = useState([]);
    useEffect(
         ()=>{
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then(
                (response)=>{
                    console.log("Products fetched successfully", response.data);
                    setProducts(response.data);
                }
            )   
         }
         ,  []
     )

    return(
        <div className="w-full h-full rounded-lg relative">
            <Link to={"/admin/addproducts"} className="bg-gray-600 absolute text-white text-3xl p-[12px] rounded-full mb-4 hover:bg-gray-300 hover:text-gray-600 cursor-pointer right-5 bottom-5">
            <FaPlus />
            </Link>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="p-2">Product ID</th>
                        <th className="p-2">Product Name</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Labeled Price</th>
                        <th className="p-2">Stock</th>
                    </tr>
                </thead>
                <tbody>
                {
                products.map(
                    (product, index)=>{
                        console.log("Mapping"+ product.productId);
                        return(
                            <tr key={index} className="border-b-2 border-gray-300 text-center hover:bg-gray-600 hover:text-white cursor-pointer">
                                <td className="p-2">{product.productId}</td>
                                <td className="p-2">{product.name}</td>
                                <td className="p-2">{product.price}</td>
                                <td className="p-2">{product.labeledPrice}</td>
                                <td className="p-2">{product.stock}</td>
                            </tr>
                        )
                    }
                )
            }
                </tbody>
            </table>
        </div>
    )
}

//https://jxbjfocsxvzbpiqpuyai.supabase.co
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4Ympmb2NzeHZ6YnBpcXB1eWFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4NTY5OTEsImV4cCI6MjA2MDQzMjk5MX0.bN1O--s3h0lP2DsSLmgfDw0PWaZKSzFy4TyLHk9e4KQ