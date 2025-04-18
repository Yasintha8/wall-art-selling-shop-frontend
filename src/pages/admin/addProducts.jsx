import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function AddProductForm() {

    const[productId, setProductID] = useState("");
    const[name, setName] = useState("");
    const[altNames, setAltNames] = useState("");
    const[price, setPrice] = useState("");
    const[labeledPrice, setLabeledPrice] = useState("");
    const[description, setDescription] = useState("");
    const[stock, setStock] = useState("");


    const navigate = useNavigate();

    function handleSubmit(){

        const altNamesArray = altNames.split(",")

        const product = {
            productId: productId,
            name: name,
            altNames: altNamesArray,  
            price: price,
            labeledPrice: labeledPrice,
            description: description,
            stock: stock,
            images: [
                " https://picsum.photos/200/300?random=1",
                " https://picsum.photos/200/300?random=2",
                " https://picsum.photos/200/300?random=3",
                " https://picsum.photos/200/300?random=4",
            ]
        }
        const token = localStorage.getItem("token")
        console.log(token);

        // product added to db
        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/product", product, {
            headers: {
                "Authorization": "Bearer "+token
            }
        }).then(
            () => {
            toast.success("Product added successfully")
            navigate("/admin/products")
        }).catch(
            () => {
            toast.error("Product add failed")
        })
        
    }

    return(
        <div className="w-full h-full rounded-lg flex justify-center items-center">
            <div className="w-[500px] h-[600px] rounded-lg shadow-lg flex flex-col items-center">
            <h1 className="text-3xl font-bold text-gray-700 m-[10px]">Add Product</h1>
            <input 
                value={productId}
                onChange={
                    (e) => 
                        setProductID(e.target.value)
                }
                className="w-[400px] h-[50px] border border-gray-500 text-gray placeholder-gray rounded-xl p-4 m-[5px] focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="Product ID"
            />
            <input 
                value={name}
                onChange={
                    (e) => 
                        setName(e.target.value)
                }
                className="w-[400px] h-[50px] border border-gray-500 text-gray placeholder-gray rounded-xl p-4 m-[5px] focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="Product Name"
            />
            <input 
                value={altNames}
                onChange={
                    (e) => 
                        setAltNames(e.target.value)
                }
                className="w-[400px] h-[50px] border border-gray-500 text-gray placeholder-gray rounded-xl p-4 m-[5px] focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="Alternative Names"
            />
            <input
                value={price}
                onChange={
                    (e) => 
                        setPrice(e.target.value)
                }
                type="number"
                className="w-[400px] h-[50px] border border-gray-500 text-gray placeholder-gray rounded-xl p-4 m-[5px] focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="Price"
            />
            <input
                value={labeledPrice}
                onChange={
                    (e) => 
                        setLabeledPrice(e.target.value)
                } 
                type="number"
                className="w-[400px] h-[50px] border border-gray-500 text-gray placeholder-gray rounded-xl p-4 m-[5px] focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="Labeled Price"
            />
            <textarea
                value={description}
                onChange={
                    (e) => 
                        setDescription(e.target.value)
                }
                className="w-[400px] h-[50px] border border-gray-500 text-gray placeholder-gray rounded-xl p-4 m-[5px] focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="Description"
            />
            {/* stock */}
            <input
                value={stock}
                onChange={
                    (e) => 
                        setStock(e.target.value)
                }
                type="number"
                className="w-[400px] h-[50px] border border-gray-500 text-gray placeholder-gray rounded-xl p-4 m-[5px] focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="Stock"
            />
            <div className="w-[400px] h-[100px] flex justify-between items-center rounded-lg">
                <Link to={"/admin/products"} className="bg-red-400 text-white text-xl p-[10px] w-[180px] text-center rounded-lg hover:bg-red-500  cursor-pointer ">Cancle</Link>
                <button onClick={handleSubmit} className="bg-green-400 text-white text-xl p-[10px] w-[180px] text-center rounded-lg ml-[10px] hover:bg-green-500  cursor-pointer ">Add Product</button>
            </div>
            </div>
        </div>
    )
}