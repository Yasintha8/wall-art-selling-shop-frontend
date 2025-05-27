import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";

export default function AddProductForm() {

    const[productId, setProductID] = useState("");
    const[name, setName] = useState("");
    const[altNames, setAltNames] = useState("");
    const[price, setPrice] = useState("");
    const[labeledPrice, setLabeledPrice] = useState("");
    const [category, setCategory] = useState("Select Category");
    const[description, setDescription] = useState("");
    const[stock, setStock] = useState("");
    const[images, setImages] = useState([]);

    const navigate = useNavigate();

    

    async function handleSubmit(){

        const promisesArray = []
        for(let i=0; i<images.length; i++){
            const promise = mediaUpload(images[i])
            promisesArray[i] = promise
        }
        try{

        const result = await Promise.all(promisesArray)
        
        const altNamesArray = altNames.split(",")

        const product = {
            productId: productId,
            name: name,
            altNames: altNamesArray,  
            price: price,
            labeledPrice: labeledPrice,
            category: category,
            description: description,
            stock: stock,
            images: result
        }
        const token = localStorage.getItem("token")
        console.log(token);

        // product added to db
        await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/product", product, {
            headers: {
                "Authorization": "Bearer "+token
            },
        })
        toast.success("Product added successfully")
        navigate("/admin/products")
    }catch(error){
        console.log(error);
        toast.error("Product add failed")
    }
    }

    return(
        <div className="w-full h-full rounded-lg flex justify-center items-center">
            <div className="w-[500px] h-[680px] rounded-lg shadow-lg flex flex-col items-center p-2">
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
            <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-[400px] h-[80px] border border-gray-500 text-gray rounded-xl p-4 m-[5px] focus:outline-none focus:ring-1 focus:ring-white"
        >
            <option value="Select Category">Select Category</option>
            <option value="Living Rooms">Living Rooms</option>
            <option value="Religious">Religious</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Resturant">Resturant</option>
        </select>
            <textarea
                value={description}
                onChange={
                    (e) => 
                        setDescription(e.target.value)
                }
                className="w-[400px] h-[200px] border border-gray-500 text-gray placeholder-gray rounded-xl p-4 m-[5px] focus:outline-none focus:ring-1 focus:ring-white"
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
                <button onClick={handleSubmit} className="bg-green-400 text-white text-xl p-[10px] w-[180px] text-center rounded-lg ml-[10px] hover:bg-green-500  cursor-pointer ">Add Product</button>
            </div>
            </div>
        </div>
    )
}


