import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";

export default function EditProductForm() {

    const locationDate = useLocation();
    const navigate = useNavigate();

    if(locationDate.state == null){
        toast.error("Please select a product to edit")
        window.location.href = "/admin/products"
        
    }

    const[productId, setProductID] = useState(locationDate.state.productId);
    const[name, setName] = useState(locationDate.state.name);
    const[altNames, setAltNames] = useState(locationDate.state.altNames.join(","));
    const[price, setPrice] = useState(locationDate.state.price);
    const[labeledPrice, setLabeledPrice] = useState(locationDate.state.labeledPrice);
    const[description, setDescription] = useState(locationDate.state.description);
    const[stock, setStock] = useState(locationDate.state.stock);
    const[images, setImages] = useState([]);

    async function handleSubmit(){

        const promisesArray = []
        for(let i=0; i<images.length; i++){
            const promise = mediaUpload(images[i])
            promisesArray[i] = promise
        }
        try{

        let result = await Promise.all(promisesArray);

        if(images.length === 0){
            result = locationDate.state.images
        }
        
        const altNamesArray = altNames.split(",")

        const product = {
            name: name,
            altNames: altNamesArray,  
            price: price,
            labeledPrice: labeledPrice,
            description: description,
            stock: stock,
            images: result,
        }
        const token = localStorage.getItem("token")
        console.log(token);

        // product added to db
        await axios.put(import.meta.env.VITE_BACKEND_URL+"/api/product/"+productId, product, {
            headers: {
                "Authorization": "Bearer "+token
            },
        })
        toast.success("Product updated successfully")
        navigate("/admin/products")
    }catch(error){
        console.log(error);
        toast.error("Product updating failed")
    }
    }

    return(
        <div className="w-full h-full rounded-lg flex justify-center items-center">
            <div className="w-[500px] h-[650px] rounded-lg shadow-lg flex flex-col items-center">
            <h1 className="text-3xl font-bold text-gray-700 m-[10px]">Edit Product</h1>
            <input 
                disabled
                value={productId}
                onChange={
                    (e) => 
                        setProductID(e.target.value)
                }
                className="w-[400px] h-[50px] border border-gray-500 text-gray-500 placeholder-gray rounded-xl p-4 m-[5px] hover:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="Product ID"
            />
            <input 
                value={name}
                onChange={
                    (e) => 
                        setName(e.target.value)
                }
                className="w-[400px] h-[50px] border border-gray-500   rounded-xl p-4 m-[5px] focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="Product Name"
            />
            <input 
                value={altNames}
                onChange={
                    (e) => 
                        setAltNames(e.target.value)
                }
                className="w-[400px] h-[50px] border border-gray-500  rounded-xl p-4 m-[5px] focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="Alternative Names"
            />
            <input
                value={price}
                onChange={
                    (e) => 
                        setPrice(e.target.value)
                }
                type="number"
                className="w-[400px] h-[50px] border border-gray-500 rounded-xl p-4 m-[5px] focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="Price"
            />
            <input
                value={labeledPrice}
                onChange={
                    (e) => 
                        setLabeledPrice(e.target.value)
                } 
                type="number"
                className="w-[400px] h-[50px] border border-gray-500 rounded-xl p-4 m-[5px] focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="Labeled Price"
            />
            <textarea
                value={description}
                onChange={
                    (e) => 
                        setDescription(e.target.value)
                }
                className="w-[400px] h-[80px] border border-gray-500  rounded-xl p-4 m-[5px] focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="Description"
            />
            <input 
                type="file"
                onChange={
                    (e) => {
                        setImages(e.target.files)
                    }
                }
                multiple
                className="w-[400px] h-[50px] border border-gray-500 text-gray placeholder-gray rounded-xl p-4 m-[5px] focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="Upload Images"
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
                <button onClick={handleSubmit} className="bg-green-400 text-white text-xl p-[10px] w-[180px] text-center rounded-lg ml-[10px] hover:bg-green-500  cursor-pointer ">Edit Product</button>
            </div>
            </div>
        </div>
    )
}


