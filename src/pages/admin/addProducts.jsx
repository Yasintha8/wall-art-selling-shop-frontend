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
    <div className="w-full flex justify-center shadow-xl items-start ">
        <div className="w-full max-w-2xl  bg-gray-100/60 rounded-xl shadow-xl p-8 space-y-6">
    <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Add Product</h1>

    <input
      value={productId}
      onChange={(e) => setProductID(e.target.value)}
      placeholder="Product ID"
      className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Product Name"
      className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input
      value={altNames}
      onChange={(e) => setAltNames(e.target.value)}
      placeholder="Alternative Names"
      className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <div className="flex gap-4">
      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        type="number"
        placeholder="Price"
        className="flex-1 h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        value={labeledPrice}
        onChange={(e) => setLabeledPrice(e.target.value)}
        type="number"
        placeholder="Labeled Price"
        className="flex-1 h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select Category</option>
      <option value="Living Rooms">Living Rooms</option>
      <option value="Religious">Religious</option>
      <option value="Kitchen">Kitchen</option>
      <option value="Resturant">Resturant</option>
    </select>

    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Description"
      className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input
      type="file"
      onChange={(e) => setImages(e.target.files)}
      multiple
      className="w-full py-2 px-4 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input
      value={stock}
      onChange={(e) => setStock(e.target.value)}
      type="number"
      placeholder="Stock"
      className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <div className="flex justify-between gap-4 mt-6">
      <Link
        to="/admin/products"
        className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold text-center py-3 rounded-lg transition"
      >
        Cancel
      </Link>
      <button
        onClick={handleSubmit}
        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
      >
        Add Product
      </button>
    </div>
  </div>
</div>

    )
}


