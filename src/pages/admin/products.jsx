import axios from "axios"
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import toast from "react-hot-toast";
import Loader from "../../components/loader";
export default function AdminProductPage(){

    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(
         ()=>{
            if(!loaded){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/product").then(
                    (response)=>{
                        console.log("Products fetched successfully", response.data);
                        setProducts(response.data);
                        setLoaded(true);
                    }
                ) 
            }
              
         }
         ,  [loaded]
     )

     // delete product function
     async function deleteProduct(id){
        const token = localStorage.getItem("token")
        if(token == null){
            toast.error("Please login first to delete product")
            return
        }
    
            try{
                await axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/product/"+id, {
                    headers: {
                        "Authorization": "Bearer "+token
                    }
                })
                setLoaded(false)
                toast.success("Product deleted successfully")
            } catch(error){
                console.log(error);
                toast.error("Product delete failed")
                return
            }
        }

    return(
        <div className="w-full h-full rounded-lg relative">
            <Link to={"/admin/addproducts"} className="bg-gray-600 absolute text-white text-3xl p-[12px] rounded-full mb-4 hover:bg-gray-300 hover:text-gray-600 cursor-pointer right-5 bottom-5">
            <FaPlus />
            </Link>
            {loaded && <table className="w-full ">
                <thead>
                    <tr>
                        <th className="p-2">Product ID</th>
                        <th className="p-2">Product Name</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Labeled Price</th>
                        <th className="p-2">Stock</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                products.map(
                    (product, index)=>{
                        return(
                            <tr key={index} className="border-b-2 border-gray-300 text-center hover:bg-gray-100 cursor-pointer">
                                <td className="p-2">{product.productId}</td>
                                <td className="p-2">{product.name}</td>
                                <td className="p-2">{product.price}</td>
                                <td className="p-2">{product.labeledPrice}</td>
                                <td className="p-2">{product.stock}</td>
                                <td className="p-2">
                                    <div className="w-full h-full flex justify-center">
                                    <FaRegTrashAlt onClick={()=>{
                                        deleteProduct(product.productId)
                                    }} className="text-[20px] m-[10px]  hover:text-red-600 " /> 
                                    <GrEdit className="text-[20px] m-[10px]  hover:text-blue-600" />
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                )
            }
                </tbody>
            </table>}
            {
                !loaded && 
                <Loader />
            }
        </div>
    )
}
