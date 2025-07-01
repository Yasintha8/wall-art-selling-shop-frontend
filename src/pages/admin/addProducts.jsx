import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";

export default function AddProductForm() {
  const [productId, setProductID] = useState("");
  const [name, setName] = useState("");
  const [altNames, setAltNames] = useState("");
  const [price, setPrice] = useState("");
  const [labeledPrice, setLabeledPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);

  const navigate = useNavigate();

  async function handleSubmit() {
    const promisesArray = [];
    for (let i = 0; i < images.length; i++) {
      const promise = mediaUpload(images[i]);
      promisesArray[i] = promise;
    }

    try {
      const result = await Promise.all(promisesArray);
      const altNamesArray = altNames.split(",");

      const product = {
        productId,
        name,
        altNames: altNamesArray,
        price,
        labeledPrice,
        category,
        description,
        stock,
        images: result,
      };

      const token = localStorage.getItem("token");

      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/product",
        product,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("Product added successfully");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Product add failed");
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100 py-10 px-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Add New Product</h1>
        <p className="text-center text-gray-500 mb-4">Fill the form below to create a new product</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Product ID</label>
            <input
              value={productId}
              onChange={(e) => setProductID(e.target.value)}
              placeholder="Enter Product ID"
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Product Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Product Name"
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-700">Alternative Names</label>
            <input
              value={altNames}
              onChange={(e) => setAltNames(e.target.value)}
              placeholder="e.g. modern, minimalist, abstract"
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Price (Rs)</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="Price"
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Labeled Price (Rs)</label>
            <input
              value={labeledPrice}
              onChange={(e) => setLabeledPrice(e.target.value)}
              type="number"
              placeholder="Labeled Price"
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Category</option>
              <option value="Living Room">Living Room</option>
              <option value="Religious">Religious</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Resturant">Resturant</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Enter product description"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-700">Upload Images</label>
            <input
              type="file"
              onChange={(e) => setImages(e.target.files)}
              multiple
              className="w-full py-2 px-4 border border-gray-300 rounded-lg bg-white file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-purple-600 file:text-white file:rounded-lg file:cursor-pointer"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-700">Stock Quantity</label>
            <input
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              type="number"
              placeholder="Available Stock"
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="flex justify-between gap-4 pt-4">
          <Link
            to="/admin/products"
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold text-center py-3 rounded-lg transition cursor-pointer"
          >
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition cursor-pointer"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
