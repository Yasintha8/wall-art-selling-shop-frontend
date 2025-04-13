import { Link } from "react-router-dom";

export default function AddProductForm() {
    return(
        <div className="w-full h-full rounded-lg flex justify-center items-center">
            <div className="w-[500px] h-[600px] rounded-lg shadow-lg flex flex-col items-center">
            <h1 className="text-3xl font-bold text-gray-700 m-[10px]">Add Product</h1>
            <input 
                className="w-[400px] h-[50px] border border-gray-500 text-gray placeholder-gray rounded-xl p-4 m-[5px] focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="Product ID"
            />
            <input 
                className="w-[400px] h-[50px] border border-gray-500 text-gray placeholder-gray rounded-xl p-4 m-[5px] focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="Product Name"
            />
            <input 
                className="w-[400px] h-[50px] border border-gray-500 text-gray placeholder-gray rounded-xl p-4 m-[5px] focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="Alternative Names"
            />
            <input 
                className="w-[400px] h-[50px] border border-gray-500 text-gray placeholder-gray rounded-xl p-4 m-[5px] focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="Price"
            />
            <input 
                className="w-[400px] h-[50px] border border-gray-500 text-gray placeholder-gray rounded-xl p-4 m-[5px] focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="Labeled Price"
            />
            <textarea 
                className="w-[400px] h-[50px] border border-gray-500 text-gray placeholder-gray rounded-xl p-4 m-[5px] focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="Description"
            />
            {/* stock */}
            <input 
                className="w-[400px] h-[50px] border border-gray-500 text-gray placeholder-gray rounded-xl p-4 m-[5px] focus:outline-none focus:ring-1 focus:ring-white"
                placeholder="Stock"
            />
            <div className="w-[400px] h-[100px] flex justify-between items-center rounded-lg">
                <Link to={"/admin/products"} className="bg-red-400 text-white text-xl p-[10px] w-[180px] text-center rounded-lg hover:bg-red-500  cursor-pointer ">Cancle</Link>
                <button className="bg-green-400 text-white text-xl p-[10px] w-[180px] text-center rounded-lg ml-[10px] hover:bg-green-500  cursor-pointer ">Add Product</button>
            </div>
            </div>
        </div>
    )
}